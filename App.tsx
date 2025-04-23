import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Button, FlatList, TextInput, StyleSheet, Modal } from 'react-native';
import { Task } from './Task';

const App = () => {

  // Initial task data
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Task 1', description: 'This is task 1', status: false },
    { id: 2, title: 'Task 2', description: 'This is task 2', status: true },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null); // For storing selected task for details modal
  const [isModalVisible, setIsModalVisible] = useState(false); // To toggle modal visibility

  // Function to toggle task status
  const toggleTaskStatus = (id: number) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, status: !task.status } : task
    );
    setTasks(updatedTasks);
  };

  //Filter task by title for search
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDetailPress = (task: Task) => {
    setSelectedTask(task);  // Store the selected task for the modal
    setIsModalVisible(true); // Show the modal
  };

  const handleAddTask = () => {
    if (newTaskTitle && newTaskDescription) {
      const newTask: Task = {
        id: Math.floor(Math.random() * 1000), // Random ID，add check for ID uniqueness
        title: newTaskTitle,
        description: newTaskDescription,
        status: false,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTaskTitle('');
      setNewTaskDescription('');
    } else {
      alert('Please fill in both title and description');
    }
  };

  const handleEditTask = (id: number) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setNewTaskTitle(taskToEdit.title);
      setNewTaskDescription(taskToEdit.description);
      setEditingTaskId(id);  // Track the task being edited
    }
  };

  const handleSaveEditedTask = (id: number) => {
    const updatedTasks = tasks.map(task =>
      task.id === id
        ? { ...task, title: newTaskTitle, description: newTaskDescription }
        : task
    );
    setTasks(updatedTasks);
    setNewTaskTitle('');
    setNewTaskDescription('');
    setEditingTaskId(null);  // Reset editing task state
  };

  const handleDeleteTask = (id: number) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  // Render each task in the list
  const renderTaskItem = ({ item }: { item: Task }) => (
    <View style={styles.taskItem}>
      <Text>{item.title}</Text>
      <Text>{item.description.split("\n")[0]}...</Text>
      <Text>{item.status ? 'Completed' : 'Pending'}</Text>
      <Button title="Toggle Status" onPress={() => toggleTaskStatus(item.id)} />
      <Button title="Edit" onPress={() => handleEditTask(item.id)} />
      {editingTaskId === item.id && (
        <Button title="Save" onPress={() => handleSaveEditedTask(item.id)} />
      )}
      <Button title="Delete" onPress={() => handleDeleteTask(item.id)} />
      <View style={styles.detailsButtonContainer}>
        <Button title="Details" onPress={() => handleDetailPress(item)} />
      </View>
    </View>
  );

  // Render the form for adding or editing tasks
  const renderTaskForm = () => (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Task Title"
        value={newTaskTitle}
        onChangeText={setNewTaskTitle}
      />
      <TextInput
        style={styles.inputDescription}
        placeholder="Task Description"
        value={newTaskDescription}
        onChangeText={setNewTaskDescription}
        multiline={true} // Enables multiline input
        numberOfLines={2} // Optional: initial number of lines to show
      />
      <Button title="Add Task" onPress={handleAddTask} />
    </View>
  );

  // Render search bar
  const renderSearchBar = () => (
    <TextInput
      style={styles.input}
      placeholder="Search tasks"
      value={searchQuery}
      onChangeText={setSearchQuery}
    />
  );

  //Can consider adding modal container.
  const renderModalContainer = () => (
    selectedTask && (
      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.header}>Task Details</Text>
          <Text>Title: {selectedTask.title}{'\n'}</Text>
          <Text>Description: {'\n'}{selectedTask.description}{'\n'}</Text>
          <Text>Status: {selectedTask.status ? 'Completed' : 'Pending'}</Text>
          <Button title="Close" onPress={() => setIsModalVisible(false)} />
        </View>
      </Modal>
    )
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.header}>Personal Task Manager</Text>
      {renderSearchBar()}
      {renderTaskForm()}
      <FlatList
        data={filteredTasks}
        renderItem={renderTaskItem}
        keyExtractor={(item) => item.id.toString()}
      />
      {renderModalContainer()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  taskItem: {
    marginBottom: 10,
    padding: 20,
    borderWidth: 1,
    borderRadius: 5,
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 2,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputDescription: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 2,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  detailsButtonContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default App;
