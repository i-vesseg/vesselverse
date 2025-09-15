import { useState } from "react";
import { motion } from "framer-motion";
import "./DatasetExplorer.css";
import NiiViewer from "./NiiViewer";

const datasets = {
  dataset1: {
    name: "IXI (experiment 1)",
    filters: ["Original", "FrangiFilter", "nnUNet", "StochasticAL", "STAPLE"],
    niftiPaths: {
      Original: "/imagesNII/IXI_AI/IXI022-Guys-0701-MRA.nii.gz",
      FrangiFilter: "/imagesNII/IXI_AI/IXI022-Guys-0701-MRA-Filtering.nii.gz",
      nnUNet: "/imagesNII/IXI_AI/IXI027-Guys-071-nnUNet.nii.gz",
      StochasticAL: "/imagesNII/IXI_AI/restored_IXI022-Guys-0701-MRA_vessel_mask.nii.gz",
      STAPLE: "/imagesNII/IXI_AI/IXI022-Guys-0701-MRA-STAPLE.nii.gz",
    },
  },
  dataset2: {
    name: "IXI (experiment 2)",
    filters: ["Original", "Manual", "COSTA", "SPOCKMIP", "STAPLE"],
    niftiPaths: {
      Original: "/imagesNII/IXI_manual/IXI020-Guys-0700-MRA.nii.gz",
      Manual: "/imagesNII/IXI_manual/IXI020-Guys-0700-MRA-TOT.nii.gz",
      COSTA: "/imagesNII/IXI_manual/translated_IXI013_vessel_mask.nii.gz",
      SPOCKMIP: "/imagesNII/IXI_manual/IXI020-Guys-0700-MRA-SPOCKMIP.nii.gz",
      STAPLE: "/imagesNII/IXI_manual/IXI022-Guys-0701-MRA-STAPLE.nii.gz",
    },
  },
  dataset3: {
    name: "TubeTK",
    filters: ["Original", "JOBVS", "nnUNet", "SPOCKMIP", "STAPLE"],
    niftiPaths: {
      Original: "/imagesNII/TubeTK/Normal001-MRA.nii.gz",
      JOBVS: "/imagesNII/TubeTK/Normal001-MRA_JOVBS.nii.gz",
      nnUNet: "/imagesNII/TubeTK/Normal001-MRA-nnUNet.nii.gz",
      SPOCKMIP: "/imagesNII/TubeTK/Normal001-MRA-SPOCKMIP.nii.gz",
      STAPLE: "/imagesNII/TubeTK/Normal001-MRA-STAPLE.nii.gz",
    },
  },
  dataset4: {
    name: "TopCoW MRA",
    filters: ["Original", "JOBVS", "nnUNet", "Manual", "STAPLE"],
    niftiPaths: {
      Original: "/imagesNII/COW-MR/topcow_mr_whole_001.nii.gz",
      JOBVS: "/imagesNII/COW-MR/topcow_mr_whole_001-JOBVS.nii.gz",
      nnUNet: "/imagesNII/COW-MR/topcow_mr_whole_001-nnUNet.nii.gz",
      Manual: "/imagesNII/COW-MR/topcow_mr_whole_001-manual.nii.gz",
      STAPLE: "/imagesNII/COW-MR/topcow_mr_whole_001-STAPLE.nii.gz",
    },
  },
  dataset5: {
    name: "TopCoW CT",
    filters: ["Original", "JOBVS", "nnUNet", "Manual", "STAPLE"],
    niftiPaths: {
      Original: "/imagesNII/COW-CT/topcow_ct_whole_001.nii.gz",
      JOBVS: "/imagesNII/COW-CT/topcow_ct_whole_001-JOBVS.nii.gz",
      nnUNet: "/imagesNII/COW-CT/topcow_ct_whole_001-nnUNet.nii.gz",
      Manual: "/imagesNII/COW-CT/topcow_ct_whole_001-Manual.nii.gz",
      STAPLE: "/imagesNII/COW-CT/topcow_ct_whole_001-STAPLE.nii.gz",
    },
  },
};

export default function DatasetExplorer() {
  const datasetKeys = Object.keys(datasets);
  const [selectedDataset, setSelectedDataset] = useState(datasetKeys[0]);
  const [selectedFilter, setSelectedFilter] = useState(
    datasets[datasetKeys[0]].filters[0]
  );

  const handleDatasetChange = (datasetKey) => {
    setSelectedDataset(datasetKey);
    if (!datasets[datasetKey].filters.includes(selectedFilter)) {
      setSelectedFilter(datasets[datasetKey].filters[0]);
    }
  };

  const currentNiftiPath =
    datasets[selectedDataset].niftiPaths[selectedFilter];

  return (
    <div className="dataset-explorer">
      {/* Layout DESKTOP/TABLET */}
      <div className="desktop-layout">
        <div className="container-layout">
          <div className="sidebar">
            {datasetKeys.map((datasetKey) => (
              <button
                key={datasetKey}
                className={`sidebar-button ${
                  selectedDataset === datasetKey ? "selected" : ""
                }`}
                onClick={() => handleDatasetChange(datasetKey)}
              >
                {datasets[datasetKey].name}
              </button>
            ))}
          </div>
          <div className="main-content">
            <div className="filters-row">
              {datasets[selectedDataset].filters.map((filterName) => (
                <button
                  key={filterName}
                  className={`filter-button ${
                    selectedFilter === filterName ? "selected" : ""
                  }`}
                  onClick={() => setSelectedFilter(filterName)}
                >
                  {filterName}
                </button>
              ))}
            </div>
            <div className="black-box">
              <motion.div
                className="image-wrapper"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <NiiViewer niftiPath={currentNiftiPath} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Layout MOBILE */}
      <div className="mobile-layout">
        <div className="mobile-selects">
          <strong>Dataset:</strong>
          <select
            value={selectedDataset}
            onChange={(e) => handleDatasetChange(e.target.value)}
          >
            {datasetKeys.map((datasetKey) => (
              <option key={datasetKey} value={datasetKey}>
                {datasets[datasetKey].name}
              </option>
            ))}
          </select>
          <strong style={{ marginTop: "0.7em" }}>Annotations:</strong>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            {datasets[selectedDataset].filters.map((filterName) => (
              <option key={filterName} value={filterName}>
                {filterName}
              </option>
            ))}
          </select>
        </div>
        <div className="black-box">
          <motion.div
            className="image-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <NiiViewer niftiPath={currentNiftiPath} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
