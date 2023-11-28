import { useEffect, useState } from "react";
import "./TaskPage.css"
import TopNav from './TopNav'; 
import { TbLetterXSmall } from "react-icons/tb";


const TaskPage = () => {
    const [userName, setUserName] = useState(null); 
    const [popUp, setPopUp] = useState(false); 
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [categories, setCategories] = useState(['Category 1', 'Category 2', 'Category 3', 'Category 4']);
    const [TList, setTList] = useState(
        [
            //CATEGORY 1 EXAMPLE
            [
                {
                    listName: "Cat 1", 
                    taskList: 
                    [
                        {name: 'CSCI 270',description: 'HW 11', dueDate: '01/2023'}, 
                        {name: 'CSCI 201',description: 'Final Project', dueDate: '08/2023'}
                    ]
                },
                {
                    listName: "Cat 1", 
                    taskList: []

                }
            ],
            // CATEGORY 2 Example
            [
                {listName: "", taskList: []}, //empty task list example
                {listName: "", taskList: []} //empty task list
            ],
            // CATEGORY 3
            [
                {listName: "", taskList: []}, //empty task list example
                {listName: "", taskList: []} //empty task list
            ],
            // CATEGORY 4
            [
                {listName: "", taskList: []}, //empty task list example
                {listName: "", taskList: []} //empty task list
            ],
        ]
    ); 
    const [activeCategory, setActiveCategory] = useState(0); // THIS IS INDEX IN CATEGORIES ARRAY
    const [listAddIndex, setListAddIndex] = useState(); // for when a task has to be added, this is the list index of TList[activeCategory]'s taskList that it will be appended to 
   

    const handleTaskNameChange = (e) => {
        setTaskName(e.target.value);
    };

    const handleTaskDescriptionChange = (e) => {
        setTaskDescription(e.target.value);
    };

    const handleDueDateChange = (e) => {
        setDueDate(e.target.value);
    };

    const closePopUp = () => {
        setPopUp(false); 
    }

    const openPopUp = (TList_index) => {
        setListAddIndex(TList_index);
        setPopUp(true); 

    }

    const changeActiveCategory = (index) => {
        setActiveCategory(index); 
    }

    const handleAddNewTask = () => {
        // Gather the values from the input fields
        const newTask = {
          name: taskName,
          description: taskDescription,
          dueDate: dueDate,
        };
    
    
        // add task
        console.log('New Task:', newTask);
        const newState = [...TList]
        newState[activeCategory][listAddIndex].taskList.push(newTask);
        setTList(newState);
        closePopUp(); 
      };

    const removeTaskItem = (TList_Index, task_index) => {
        const newTask = {
            name: taskName,
            description: taskDescription,
            dueDate: dueDate,
          };
      
      
          // remove task
          console.log('New Task:', newTask);
          const newState = [...TList]
          newState[activeCategory][TList_Index].taskList.splice(task_index, 1);
          setTList(newState);
    }

    const fetchTestInfo = async () => {
        try {
         console.log("trying to fetch!");
          const response = await fetch('http://localhost:8080/todo-list-201/testservlet'); 
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          console.log("response is okay!");
          const data = await response.text();
          console.log(data); 
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      };
  
  


    useEffect(() => {
        setUserName("Adam Raslan");
        // need to fetch userinfo
        fetchTestInfo();



        // need to load user's info 

        // values needed:
        // USERNAME (fname + " " + lname)
        // Tlists in the frontend = List<Tlists>() lists in backend
        //  //example task list object
        // const [taskList, setTaskList] = useState([{
        //     name: '',
        //     description: '',
        //     dueYear: '',
        //     dueMonth: '',
        //     dueDay: '',
        //   }]) 
        // add in this format!

    }, []);



    return (
    <div id ="Taskpage">
        {popUp && 
        <div className="popUp">
            <div className="popUpContainer">
                <div className="headerTaskContainerPopup">
                    <div> <h2>Add New Task</h2></div>
                    <div><button className="removeTaskBtn" onClick= {() => {closePopUp()}}><TbLetterXSmall className="custom-icon-style" ></TbLetterXSmall></button></div>
                </div>
                
                <label htmlFor="taskName">Task Name:</label>
                <input
                type="text"
                id="taskName"
                value={taskName}
                onChange={handleTaskNameChange}
                />
                <label htmlFor="taskDescription">Task Description:</label>
                <textarea
                id="taskDescription"
                value={taskDescription}
                onChange={handleTaskDescriptionChange}
                placeholder="Enter your description here!"
                />
                <label htmlFor="dueDate">Due Date:</label>
                <input
                type="text"
                id="dueDate"
                value={dueDate}
                onChange={handleDueDateChange}
                />
                <button className="confirmAddNewTask" onClick={handleAddNewTask}>+ Add New Task</button>
            </div>
        </div>
        }
        <TopNav></TopNav>
        <div id="MainContainer">
            <div id = "leftSide">
                {userName && <h1>Welcome, <br></br>{userName}</h1>}
                <div className="categoriesContainer">
                    {categories && categories.map((category, index) => (
                        <button key={index} className="categoryBtn" onClick={() => changeActiveCategory(index)}>
                        {category}
                        </button>
                    ))}
                </div>
            </div>
            <div id="verticalWhiteBar"></div>
            <div id="rightSide">
                {TList && TList[activeCategory].map((T_List, index1) => (
                    <div key={index1} className="taskContainer">
                        <div className="headerTaskContainer">
                            <h2>{T_List.listName}</h2>
                            <button className="addTask" onClick={() => {openPopUp(index1)}}>+ Add New Task</button>
                        </div>
                        {T_List.taskList.map((task, index2) => (
                        <div className="taskBox">
                            <div className="topHeading">
                            <p className="dueDate">{task.dueDate}</p>
                            <button className="removeTaskBtn" onClick={() => removeTaskItem(index1, index2)}><TbLetterXSmall className="custom-icon-style" ></TbLetterXSmall></button>
                            </div>
                            <p className="taskname">{task.name}</p>
                            <p className="taskDescription">{task.description}</p>
                        </div>))
                        }
                    </div>
                ))}
            </div>
        </div>
    </div>
    );
}
 
export default TaskPage;