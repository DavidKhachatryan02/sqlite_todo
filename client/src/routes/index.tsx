import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Container } from "@mui/material";
import TaskDetails from "../components/TaskDetails";
import TaskList from "../components/TaskList";

const AppRoutes = () => (
  <BrowserRouter>
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/task/:id" element={<TaskDetails />} />
      </Routes>
    </Container>
  </BrowserRouter>
);

export default AppRoutes;
