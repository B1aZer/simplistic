# Simplistic.js

Minimal front end framework.

## Main Concepts

 - No external transpilers, libraries, packages ...
 - No logic in views. Views should be defined in HTML.
 - One way data flow: View/XHR/Bluetooth => reducer =>(observables) controller => view
 - No JS support

## Tasks

 - Update binding in multiple places. Do we really need props ?
    <ToDoList data-list="list">
        <ToDoItem data-item="item">
 - If you use custom tags, show where the content is
