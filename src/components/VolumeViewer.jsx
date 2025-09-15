import React, { useEffect, useRef } from "react";
import * as nifti from "nifti-reader-js";
import vtkRenderWindow from "vtk.js/Sources/Rendering/Core/RenderWindow";
import vtkRenderer from "vtk.js/Sources/Rendering/Core/Renderer";
import vtkOpenGLRenderWindow from "vtk.js/Sources/Rendering/OpenGL/RenderWindow";
import vtkRenderWindowInteractor from "vtk.js/Sources/Rendering/Core/RenderWindowInteractor";
import vtkInteractorStyleTrackballCamera from "vtk.js/Sources/Interaction/Style/InteractorStyleTrackballCamera";

// Componenti per visualizzazione 2D
import vtkImageMapper from "vtk.js/Sources/Rendering/Core/ImageMapper";
import vtkImageSlice from "vtk.js/Sources/Rendering/Core/ImageSlice";

import vtkImageData from "vtk.js/Sources/Common/DataModel/ImageData";
import vtkDataArray from "vtk.js/Sources/Common/Core/DataArray";

const VolumeViewer = ({ niftiPath }) => {
  const containerRef = useRef();

  useEffect(() => {
    if (!niftiPath || !containerRef.current) {
      console.warn("⛔ No path or container available");
      return;
    }

    const container = containerRef.current;
    let width = container.offsetWidth;
    let height = container.offsetHeight;
    if (width === 0 || height === 0) {
      console.warn("Container dimensions zero, forcing width=600, height=600");
      width = 600;
      height = 600;
    }

    // Crea la scena VTK
    const renderWindow = vtkRenderWindow.newInstance();
    const renderer = vtkRenderer.newInstance();
    renderWindow.addRenderer(renderer);
    // Sfondo per il renderer (blu/verde)
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

    // Carica il file NIfTI
    fetch(niftiPath)
      .then((res) => {
        console.log("📦 Fetching NIfTI:", niftiPath);
        return res.arrayBuffer();
      })
      .then((buffer) => {
        const isCompressed = nifti.isCompressed(buffer);
        const maybeNifti = isCompressed ? nifti.decompress(buffer) : buffer;

        if (!nifti.isNIFTI(maybeNifti)) {
          throw new Error("❌ Not a valid NIfTI file: " + niftiPath);
        }

        const header = nifti.readHeader(maybeNifti);
        const image = nifti.readImage(header, maybeNifti);
        const dims = header.dims.slice(1, 4); // [x, y, z]
        console.log("Image dimensions:", dims);

        // Helper per convertire i dati nel tipo corretto
        const getTypedArray = (buf, datatypeCode) => {
          switch (datatypeCode) {
            case nifti.NIFTI1.TYPE_UINT8:
              return new Uint8Array(buf);
            case nifti.NIFTI1.TYPE_INT16:
              return new Int16Array(buf);
            case nifti.NIFTI1.TYPE_INT32:
              return new Int32Array(buf);
            case nifti.NIFTI1.TYPE_FLOAT32:
              return new Float32Array(buf);
            case nifti.NIFTI1.TYPE_FLOAT64:
              return new Float64Array(buf);
            default:
              throw new Error("❌ Unsupported NIfTI datatype");
          }
        };

        const data = getTypedArray(image, header.datatypeCode);

        // Crea vtkImageData e imposta dimensioni e spacing
        const imageData = vtkImageData.newInstance();
        imageData.setDimensions(...dims);
        imageData.setSpacing(...header.pixDims.slice(1, 4));

        const scalars = vtkDataArray.newInstance({
          name: "Scalars",
          values: data,
          numberOfComponents: 1,
        });
        imageData.getPointData().setScalars(scalars);

        // Crea un ImageMapper per visualizzare una slice 2D
        const imageMapper = vtkImageMapper.newInstance();
        imageMapper.setInputData(imageData);
        // Slicing lungo l'asse Z (K)
        imageMapper.setSlicingMode(vtkImageMapper.SlicingMode.K);
        // Seleziona la slice centrale
        const sliceIndex = Math.floor(dims[2] / 2);
        imageMapper.setSlice(sliceIndex);

        // Crea l'attore ImageSlice per la visualizzazione 2D
        const imageSlice = vtkImageSlice.newInstance();
        imageSlice.setMapper(imageMapper);

        // Imposta i parametri di window/level basandoci sul range dei voxel
        // Utilizziamo i valori "default": window = max - min, level = (max+min)/2
        const range = imageData.getPointData().getScalars().getRange(); // ad esempio, [0, 437]
        console.log("Voxel Range:", range);
        imageSlice.getProperty().setColorWindow(range[1] - range[0]); // 437
        imageSlice.getProperty().setColorLevel((range[1] + range[0]) / 2); // circa 218

        // Aggiungi l'attore al renderer
        renderer.addViewProp(imageSlice);

        // Log dei bounds dell'attore per verificare che sia in scena
        console.log("ImageSlice bounds:", imageSlice.getBounds());

        // Reset della camera e rendering
        renderer.resetCamera();
        console.log("Camera position:", renderer.getActiveCamera().getPosition());
        openglRenderWindow.render();
        interactor.render();

        console.log("✅ 2D Slice rendering completed");
      })
      .catch((err) => console.error("❌ NIfTI Load Error:", niftiPath, err));
  }, [niftiPath]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "600px",
        height: "600px",
        backgroundColor: "black",
        border: "2px solid red" // bordo per evidenziare il container
      }}
    />
  );
};

export default VolumeViewer;
