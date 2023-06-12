import React, { Component } from "react";
import AppHeader from "../app-header/app-header"
import TodoList from "../todo-list/todo-list";
import SearchPanel from "../search-panel/search-panel";
import ItemStatusFilter from "../item-status-filter";
import ItemAddForm from "../item-add-form";

import "./app.css";

class App extends Component {
    state = {
        todoData: [
            { text: 'Wake up', important: false, done: false, id: 1 },
            { text: 'Have breakfast', important: false, done: false, id: 2 },
            { text: 'Make STEP IT HW\'s', important: false, done: false, id: 3 }
        ], term: '', filter: 'all'
    };

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);
            const newArray = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ];
            return {
                todoData: newArray
            };
        });
    };

    createTodoItem(text) {
        return {
            text,
            important: false,
            done: false,
            id: Date.now()
        };
    }

    addItem = (text) => {
        this.setState(({ todoData }) => {
            const newArray = [
                ...todoData,
                this.createTodoItem(text)
            ];
            return {
                todoData: newArray
            };
        });
    };

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idx];
        const newItem = { ...oldItem, [propName]: !oldItem[propName] };
        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    }

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, "important")
            };
        });
    };

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, "done")
            };
        });
    };
    onSearchChange = (term) => {
        this.setState({ term })
    }

    search(items, term) {
        if (term.length === 0) {
            return items;
        }
        return items.filter(
            (item) => item.text.toLowerCase().indexOf(term.toLowerCase()) > -1
        )
    };

    onFilterChange = (filter) => {
        this.setState({ filter });
    };

    filter(items, filter) {
        switch (filter) {
            case 'all':
                return items;
            case 'done':
                return items.filter((item) => item.done);
            case 'active':
                return items.filter((item) => !item.done);
            default:
                return items;
        }
    }

    render() {
        const { todoData, term, filter } = this.state
        const visibleItems = this.filter(this.search(todoData, term), filter)
        const doneCount = todoData.filter((item) => item.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className='todo-app'>
                <AppHeader todo={todoCount} done={doneCount} />
                <div className='top-panel d-flex'>
                    <SearchPanel
                        onSearchChange={this.onSearchChange} />
                    <ItemStatusFilter
                    filter={filter}
                    onFilterChange={this.onFilterChange}/>
                </div>
                <TodoList
                    todos={visibleItems}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />
                <ItemAddForm onAdded={this.addItem} />
            </div>
        );
    }
}

export default App;
