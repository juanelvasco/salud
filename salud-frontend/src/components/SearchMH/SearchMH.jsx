import React, { useState } from "react";
import {
  IconButton,
  Box,
  Typography,
  Alert,
  CircularProgress,
  Paper,
  InputBase,
  Collapse,
  Divider,
  MenuItem,
  Select,
  Fab,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import MedicalHistoriesList from "../MedicalHistoriesList";
import FormHeader from "../FormHeader";
import ScreenSearchDesktopIcon from "@mui/icons-material/ScreenSearchDesktop";
import {
  getAllMedicalHistories,
  getMedicalHistoryByDocument,
  getMedicalHistoryByNameAndSurname,
} from "../../services/medical-history-service";
import "./SearchMH.scss";

// Preguntar por el useState porque imprime siempre que cambia de estado
export default function SearchMH() {
  const [primarySearchValue, setPrimarySearchValue] = useState("");
  const [secondarySearchValue, setSecondarySearchValue] = useState("");
  const [filter, setFilter] = useState("DOC");
  const [docType, setDocType] = useState("DNI");
  const [medicalHistories, setMedicalHistories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [firstTime, setFirstTime] = useState(true);
  const [error, setError] = useState({ message: "", show: false });

  const handleSearchChangePrimary = (event) => {
    setPrimarySearchValue(event.target.value);
  };
  const handleSearchChangeSecondary = (event) => {
    setSecondarySearchValue(event.target.value);
  };
  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilter(value);
    setError({ show: false });
    if (value === "TODAS") {
      setPrimarySearchValue("");
    }
    if (value === "NOMBREYAPELLIDO") {
      setSecondarySearchValue("");
    }
  };

  const handleDocChange = (event) => {
    setDocType(event.target.value);
    setError({ show: false });
  };

  const validateSearchInput = () => {
    if (!/^(?!\s*$).+/.test(primarySearchValue)) {
      setError({
        message: "El campo de busqueda esta vacío, ingrese un número.",
        show: true,
      });
    } else if (!/^[1-9][0-9]{6,8}$/i.test(primarySearchValue)) {
      setError({
        message: "En numero de documento ingresado es inválido.",
        show: true,
      });
    } else {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    setIsLoading(true);
    console.log(filter);
    if (filter === "TODAS") {
      const response = await getAllMedicalHistories();
      setMedicalHistories(response.data);
    } else if (filter === "NOMBREYAPELLIDO") {
      const response = await getMedicalHistoryByNameAndSurname(
        primarySearchValue,
        secondarySearchValue
      );
      console.log(response.data);
      setMedicalHistories(response.data);
    } else {
      const response = await getMedicalHistoryByDocument(
        docType,
        primarySearchValue
      );
      setMedicalHistories(response.data ? [response.data] : []);
    }
    setError({ show: false });
    setIsLoading(false);
    setFirstTime(false);
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#DFDFDF" }}>
      <FormHeader
        title="Historias clínicas"
        subTitle={"Búsqueda"}
        icon={<ScreenSearchDesktopIcon fontSize="large" />}
      />
      <Box className="listContainer">
        <Box sx={{ display: "flex" }}>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              minWidth: 500,
              maxWidth: 650,
              mt: 2,
              ml: "auto",
              mr: "auto",
            }}
          >
            <Select value={filter} onChange={handleFilterChange} size="small">
              <MenuItem value={"DOC"}>DOC</MenuItem>
              <MenuItem value={"TODAS"}>TODAS</MenuItem>
              <MenuItem value={"NOMBREYAPELLIDO"}>NOMBRE Y APELLIDO</MenuItem>
            </Select>
            {filter === "DOC" && (
              <Select
                value={docType}
                onChange={handleDocChange}
                size="small"
                sx={{ ml: 0.5 }}
              >
                <MenuItem value={"DNI"}>DNI</MenuItem>
                <MenuItem value={"LE"}>LE</MenuItem>
                <MenuItem value={"LC"}>LC</MenuItem>
                <MenuItem value={"CI"}>CI</MenuItem>
              </Select>
            )}
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder={
                filter != "NOMBREYAPELLIDO" ? "Buscar..." : "Nombre..."
              }
              onChange={handleSearchChangePrimary}
              disabled={filter === "TODAS"}
              value={primarySearchValue}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            {filter != "NOMBREYAPELLIDO" && (
              <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="search"
                onClick={
                  filter === "TODAS" ? handleSearch : validateSearchInput
                }
              >
                <SearchIcon />
              </IconButton>
            )}
            {filter === "NOMBREYAPELLIDO" && (
              <>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Apellido..."
                  onChange={handleSearchChangeSecondary}
                  value={secondarySearchValue}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                  onClick={handleSearch}
                >
                  <SearchIcon />
                </IconButton>
              </>
            )}
          </Paper>
          <Tooltip title="Crear nueva historia">
            <Fab
              size="large"
              sx={{ mr: 1, mt: 2 }}
              component={Link}
              to={"/HistoriasClinicas/Crear"}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </Box>
        <Box
          sx={{
            ml: "auto",
            mr: "auto",
            mt: "5px",
            minWidth: 300,
            maxWidth: 500,
          }}
        >
          <Collapse in={error.show}>
            <Alert
              severity="error"
              sx={{ borderRadius: "25px", mt: 1 }}
              onClose={() => {
                setError({ message: "", show: false });
              }}
            >
              {error.message}
            </Alert>
          </Collapse>
        </Box>
        <MedicalHistoriesList mhList={medicalHistories} />
        {isLoading && (
          <Box className="centered">
            <CircularProgress size={150} />
          </Box>
        )}
        {!isLoading && medicalHistories.length === 0 && !firstTime && (
          <Box className="centered">
            <Typography variant="h4" component="div">
              No hay resultados.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
