import { useEffect, useState } from "react";
import "./TaskPage.css"
import TopNav from './TopNav'; 
import { TbX } from "react-icons/tb";
import { TbCircleCheck } from "react-icons/tb";
import { TbCircleCheckFilled } from "react-icons/tb";



const TaskPage = () => {
    const [userName, setUserName] = useState(null); 
    const [categories, setCategories] = useState(['Category 1', 'Category 2', 'Category 3', 'Category 4']);

    const [taskPopUp, setTaskPopUp] = useState(false); 
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    
    const [listName, setListName] = useState('');
    const [listPopUp, setListPopUp] = useState(false);

    const [categoryName, setCategoryName] = useState('');
    const [categoryPopUp, setCategoryPopUp] = useState(false);
    
    const [TList, setTList] = useState(
        [
            //CATEGORY 1 EXAMPLE
            [
                // {
                //     listName: "Cat 1", 
                //     taskList: 
                //     [
                //         {name: 'CSCI 270',description: 'HW 11', dueDate: '01/2023'}, 
                //         {name: 'CSCI 201',description: 'Final Project', dueDate: '08/2023'}
                //     ]
                // },
                // {
                //     listName: "Cat 1", 
                //     taskList: []

                // }
            ],
            // CATEGORY 2 Example
            [
                // {listName: "", taskList: []}, //empty task list example
                // {listName: "", taskList: []} //empty task list
            ],
            // CATEGORY 3
            [
                // {listName: "", taskList: []}, //empty task list example
                // {listName: "", taskList: []} //empty task list
            ],
            // CATEGORY 4
            [
                // {listName: "", taskList: []}, //empty task list example
                // {listName: "", taskList: []} //empty task list
            ],
        ]
    ); 
    const [activeCategory, setActiveCategory] = useState(0); // THIS IS INDEX IN CATEGORIES ARRAY
    const [listAddIndex, setListAddIndex] = useState(); // for when a task has to be added, this is the list index of TList[activeCategory]'s taskList that it will be appended to 
   
    const changeActiveCategory = (index) => {
        setActiveCategory(index); 
    }

    // ADD/REMOVE TASK FUNCTIONS
    const handleTaskNameChange = (e) => {
        setTaskName(e.target.value);
    };

    const handleTaskDescriptionChange = (e) => {
        setTaskDescription(e.target.value);
    };

    const handleDueDateChange = (e) => {
        setDueDate(e.target.value);
    };

    const closeTaskPopUp = () => {
        setTaskPopUp(false); 
    }

    const openTaskPopUp = (TList_index) => {
        setListAddIndex(TList_index);
        setTaskPopUp(true); 
    }

    const handleAddNewTask = () => {
        if (taskName.trim() === '') {
            // Handle the case where the category name is empty
            alert("Task name cannot be empty.");
            return;
        }

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
        closeTaskPopUp(); 
      };

    const removeTaskItem = (TList_Index, task_index) => {
       
          // remove task
          const newState = [...TList]
          newState[activeCategory][TList_Index].taskList.splice(task_index, 1);
          setTList(newState);
    }

    // ADD/REMOVE LIST FUNCTIONS
    const openListPopUp = () => {
        setListPopUp(true);
    };
    
    const closeListPopUp = () => {
        setListPopUp(false);
    };
    
    const handleListNameChange = (e) => {
        setListName(e.target.value);
    };
    
    const handleAddNewList = () => {
        if (listName.trim() === '') {
            // Handle the case where the category name is empty
            alert("List name cannot be empty.");
            return;
        }

        const newTaskList = {
            listName: listName, 
            taskList: []
        };
        
        console.log('New List:', newTaskList);
        const updatedTList = [...TList];

        updatedTList[activeCategory] = [...updatedTList[activeCategory], newTaskList];

        setTList(updatedTList);
        closeListPopUp();
    };

    // ADD/REMOVE CATEGORY FUNCTIONS
    const openCategoryPopUp = () => {
        setCategoryPopUp(true);
    };
    
    const closeCategoryPopUp = () => {
        setCategoryPopUp(false);
    };
    
    const handleCategoryNameChange = (e) => {
        setCategoryName(e.target.value);
    };
    
    const handleAddNewCategory = () => {
        if (categoryName.trim() === '') {
            // Handle the case where the category name is empty
            alert("Category name cannot be empty.");
            return;
        }
        
        console.log('New Category:', categoryName);
        setCategories([...categories, categoryName]);

        setTList([...TList, []]);
        
        setCategoryName('');

        closeCategoryPopUp();
    };
    

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
        {/* ADD/REMOVE TASK */}
        {taskPopUp && 
        <div className="popUp">
            <div className="popUpContainer">
                <div className="headerTaskContainerPopup">
                    <div> <h2>Add New Task</h2></div>
                    <div><button className="removeTaskBtn" onClick= {() => {closeTaskPopUp()}}><TbX className="custom-icon-style" ></TbX></button></div>
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
        {/* ADD/REMOVE LIST */}
        {listPopUp && 
        <div className="popUp">
            <div className="popUpContainer">
                <div className="headerTaskContainerPopup">
                    <div> <h2>Add New List</h2></div>
                    <div><button className="removeTaskBtn" onClick= {() => {closeListPopUp()}}><TbX className="custom-icon-style" ></TbX></button></div>
                </div>
                
                <label htmlFor="listName">List Name:</label>
                <input
                type="text"
                id="listName"
                value={listName}
                onChange={handleListNameChange}
                />
                <button className="confirmAddNewTask" onClick={handleAddNewList}>+ Add New List</button>
            </div>
        </div>
        }
        {/* ADD/REMOVE CATEGORY */}
        {categoryPopUp && 
        <div className="popUp">
            <div className="popUpContainer">
                <div className="headerTaskContainerPopup">
                    <div> <h2>Add New Category</h2></div>
                    <div><button className="removeTaskBtn" onClick= {() => {closeCategoryPopUp()}}><TbX className="custom-icon-style" ></TbX></button></div>
                </div>
                
                <label htmlFor="categoryName">Category Name:</label>
                <input
                type="text"
                id="categoryName"
                value={categoryName}
                onChange={handleCategoryNameChange}
                />
                <button className="confirmAddNewTask" onClick={handleAddNewCategory}>+ Add New Category</button>
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
                    <button className="categoryBtn" onClick={openCategoryPopUp}>+ Add New Category</button>
                </div>
            </div>
            <div id="verticalWhiteBar"></div>
            <div id="rightSide">
                {TList && TList[activeCategory].map((T_List, index1) => (
                    <div key={index1} className="taskContainer">
                        <div className="headerTaskContainer">
                            <h2>{T_List.listName}</h2>
                            <button className="addTask" onClick={() => {openTaskPopUp(index1)}}>+ Add New Task</button>
                        </div>
                        {T_List.taskList.map((task, index2) => (
                        <div className="taskBox">
                            <div className="topHeading">
                            <p className="dueDate">{task.dueDate}</p>
                            <button className="removeTaskBtn" onClick={() => removeTaskItem(index1, index2)}><TbX className="custom-icon-style" ></TbX></button>
                            </div>
                            <p className="taskname">{task.name}</p>
                            <p className="taskDescription">{task.description}</p>
                        </div>))
                        }
                    </div>
                ))}
                <button className="addTaskListBtn" onClick={openListPopUp}>+ Add New Task List</button>
            </div>
        </div>
    </div>
    );
}
 
export default TaskPage;