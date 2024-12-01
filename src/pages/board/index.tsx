import React, { useState } from "react";
import { Box, Typography, Card, CardContent, Grid, IconButton, Modal, Paper, CircularProgress, Snackbar, Alert, Grid2 } from "@mui/material";
import { DragDropContext, Droppable, Draggable, OnDragEndResponder } from "react-beautiful-dnd";
import { styled } from "@mui/system";

const ColumnContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  minHeight: "70vh",
  backgroundColor: "#f5f5f5",
  borderRadius: theme.spacing(1),
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
}));

const TaskCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)"
  }
}));

interface Task {
    id: string, 
    title:  string, 
    description: string, 
    priority: string
}
interface Board {
    backlog: Task[]; 
    inProgress: Task[];
    completed: Task[];
}

interface Column {
    id: string;
    title: string;
    color: string;
}

const initialTasks: Board = {
  backlog: [
    { id: "1", title: "Design UI mockups", description: "Create wireframes for new features", priority: "High" },
    { id: "2", title: "Database optimization", description: "Improve query performance", priority: "Medium" }
  ],
  inProgress: [
    { id: "3", title: "API integration", description: "Implement REST endpoints", priority: "High" },
    { id: "4", title: "Unit testing", description: "Write test cases for core modules", priority: "Low" }
  ],
  completed: [
    { id: "5", title: "Bug fixes", description: "Fix reported issues in v1.0", priority: "Medium" },
    { id: "6", title: "Documentation", description: "Update technical docs", priority: "Low" }
  ]
};

const ProjectBoard = () => {
  const [tasks, setTasks] = useState<Board>(initialTasks);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleDragEnd: OnDragEndResponder = (result) => {
    if (!result.destination) return;

    setLoading(true);
    const { source, destination } = result;

    const sourceColumn= source.droppableId as keyof Board;
    const destColumn = destination.droppableId as keyof Board;
    
    const sourceTasks = [...tasks[sourceColumn]];
    const destTasks = sourceColumn === destColumn ? sourceTasks : [...tasks[destColumn]];

    const [removed] = sourceTasks.splice(source.index, 1);
    destTasks.splice(destination.index, 0, removed);

    setTasks((prev: any) => ({
      ...prev,
      [sourceColumn]: sourceTasks,
      [destColumn]: destTasks
    }));

    setTimeout(() => setLoading(false), 500);
  };

  const handleTaskClick = (task: any) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const handleDeleteTask = (columnId: string, taskId: string) => {
    
  };

  const columns: Column[] = [
    { id: "backlog", title: "Backlog", color: "#ff9800" },
    { id: "inProgress", title: "In Progress", color: "#2196f3" },
    { id: "completed", title: "Completed", color: "#4caf50" }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Project Tracking Board
      </Typography>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid2 container spacing={3}>
          {columns.map((column: Column) => (
            <Grid2 key={column.id}>
              <ColumnContainer>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, color: column.color, fontWeight: "bold" }}
                  role="heading"
                >
                  {column.title}
                </Typography>

                <Droppable droppableId={column.id}>
                  {(provided) => (
                    <Box
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      sx={{ minHeight: "100px" }}
                    >
                      {tasks[column.id as  keyof Board].map((task: Task, index: number) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <TaskCard
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              role="article"
                              aria-label={`Task: ${task.title}`}
                            >
                              <CardContent>
                                <Typography variant="h6">{task.title}</Typography>
                                <Typography color="textSecondary" sx={{ mb: 1 }}>
                                  {task.description}
                                </Typography>
                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                  <Typography
                                    variant="caption"
                                    sx={{
                                      backgroundColor: column.color,
                                      color: "white",
                                      padding: "4px 8px",
                                      borderRadius: "4px"
                                    }}
                                  >
                                    {task.priority}
                                  </Typography>
                                  <Box>
                                    <IconButton
                                      size="small"
                                      onClick={() => handleTaskClick(task)}
                                      aria-label="Edit task"
                                    >
                                     EDIT
                                    </IconButton>
                                    <IconButton
                                      size="small"
                                      onClick={() => handleDeleteTask(column.id, task.id)}
                                      aria-label="Delete task"
                                    >
                                    DELETE
                                    </IconButton>
                                  </Box>
                                </Box>
                              </CardContent>
                            </TaskCard>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </ColumnContainer>
            </Grid2>
          ))}
        </Grid2>
      </DragDropContext>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="task-modal-title"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2
          }}
        >
          {selectedTask && (
            <>
              <Typography id="task-modal-title" variant="h6" component="h2">
                {selectedTask.title}
              </Typography>
              <Typography sx={{ mt: 2 }}>{selectedTask.description}</Typography>
              <Typography sx={{ mt: 2 }} color="primary">
                Priority: {selectedTask.priority}
              </Typography>
            </>
          )}
        </Box>
      </Modal>

      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
          }}
        >
          <CircularProgress />
        </Box>
      )}
    {
        error &&
        <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={() => setError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
       
          <Alert severity='error' sx={{ width: "100%" }}>
            Error
          </Alert>
       
      </Snackbar>
    }
    </Box>
  );
};

export default ProjectBoard;