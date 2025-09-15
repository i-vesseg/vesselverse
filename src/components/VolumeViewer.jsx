// src/VolumeViewer.jsx
import React, { useEffect, useRef } from "react";
import * as nifti from "nifti-reader-js";
import vtkRenderWindow from "vtk.js/Sources/Rendering/Core/RenderWindow";
import vtkRenderer from "vtk.js/Sources/Rendering/Core/Renderer";
import vtkOpenGLRenderWindow from "vtk.js/Sources/Rendering/OpenGL/RenderWindow";
import vtkRenderWindowInteractor from "vtk.js/Sources/Rendering/Core/RenderWindowInteractor";
import vtkInteractorStyleTrackballCamera from "vtk.js/Sources/Interaction/Style/InteractorStyleTrackballCamera";
import vtkImageMapper from "vtk.js/Sources/Rendering/Core/ImageMapper";
import vtkImageSlice from "vtk.js/Sources/Rendering/Core/ImageSlice";
import vtkImageData from "vtk.js/Sources/Common/DataModel/ImageData";
import vtkDataArray from "vtk.js/Sources/Common/Core/DataArray";

// Utility per path con base
function withBase(p) {
  if (!p) return p;
  if (/^https?:\/\//i.test(p)) return p;
  const base = import.meta.env.BASE_URL || "/";
  return `${base}${p.replace(/^\//, "")}`;
}

const VolumeViewer = ({ niftiPath }) => {
  const containerRef = useRef();

  useEffect(() => {
    if (!niftiPath || !containerRef.current) return;

    const container = containerRef.current;
    let width = container.offsetWidth || 600;
    let height = container.offsetHeight || 600;

    const renderWindow = vtkRenderWindow.newInstance();
    const renderer = vtkRenderer.newInstance();
    renderWindow.addRenderer(renderer);
    renderer.setBackground(0.2, 0.3, 0.4);

    const openglRenderWindow = vtkOpenGLRenderWindow.newInstance();
    openglRenderWindow.setContainer(container);
    renderWindow.addView(openglRenderWindow);
    openglRenderWindow.setSize(width, height);

    const interactor = vtkRenderWindowInteractor.newInstance();
    interactor.setView(openglRenderWindow);
    interactor.bindEvents(container);
    interactor.setInteractorStyle(
      vtkInteractorStyleTrackballCamera.newInstance()
    );

    fetch(withBase(niftiPath))
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const isCompressed = nifti.isCompressed(buffer);
        const maybeNifti = isCompressed ? nifti.decompress(buffer) : buffer;

        if (!nifti.isNIFTI(maybeNifti)) {
          throw new Error("Not a valid NIfTI file: " + niftiPath);
        }

        const header = nifti.readHeader(maybeNifti);
        const image = nifti.readImage(header, maybeNifti);
        const dims = header.dims.slice(1, 4);

        const getTypedArray = (buf, datatypeCode) => {
          switch (datatypeCode) {
            case nifti.NIFTI1.TYPE_UINT8: return new Uint8Array(buf);
            case nifti.NIFTI1.TYPE_INT16: return new Int16Array(buf);
            case nifti.NIFTI1.TYPE_INT32: return new Int32Array(buf);
            case nifti.NIFTI1.TYPE_FLOAT32: return new Float32Array(buf);
            case nifti.NIFTI1.TYPE_FLOAT64: return new Float64Array(buf);
            default: throw new Error("Unsupported NIfTI datatype");
          }
        };

        const data = getTypedArray(image, header.datatypeCode);

        const imageData = vtkImageData.newInstance();
        imageData.setDimensions(...dims);
        imageData.setSpacing(...header.pixDims.slice(1, 4));

        const scalars = vtkDataArray.newInstance({
          name: "Scalars",
          values: data,
          numberOfComponents: 1,
        });
        imageData.getPointData().setScalars(scalars);

        const imageMapper = vtkImageMapper.newInstance();
        imageMapper.setInputData(imageData);
        imageMapper.setSlicingMode(vtkImageMapper.SlicingMode.K);
        imageMapper.setSlice(Math.floor(dims[2] / 2));

        const imageSlice = vtkImageSlice.newInstance();
        imageSlice.setMapper(imageMapper);

        const range = imageData.getPointData().getScalars().getRange();
        imageSlice.getProperty().setColorWindow(range[1] - range[0]);
        imageSlice.getProperty().setColorLevel((range[1] + range[0]) / 2);

        renderer.addViewProp(imageSlice);
        renderer.resetCamera();
        openglRenderWindow.render();
        interactor.render();
      })
      .catch((err) => console.error("NIfTI Load Error:", niftiPath, err));
  }, [niftiPath]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "600px",
        height: "600px",
        backgroundColor: "black",
      }}
    />
  );
};

export default VolumeViewer;
