# Exercises Part 0

## Exercise 0.4


```mermaid
sequenceDiagram
    participant browser
    participant server

    Note over browser: User fills in the form and clicks the Save button
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note (sends url encoded note content)
    activate server
    Note over server: Server adds new note to database
    server-->>browser: HTTP 302 redirect to /notes
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: JavaScript file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: JSON with all notes including the new one
    deactivate server

```

## Exercise 0.5
```mermaid
sequenceDiagram
    participant Browser as Browser
    participant Server as Server

    Note over Browser: User navigates to the SPA version of the notes app
    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate Server
    Server-->>Browser: HTML document (including embedded CSS/JS)
    deactivate Server

    Note right of Browser: Browser renders the SPA structure
    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/spa/main.css
    activate Server
    Server-->>Browser: CSS file
    deactivate Server

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/spa/main.js
    activate Server
    Server-->>Browser: JavaScript file
    deactivate Server

    Note right of Browser: SPA logic initialized, JavaScript executed
    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/spa/data.json
    activate Server
    Server-->>Browser: JSON data (notes)
    deactivate Server

    Note right of Browser: Browser updates the page dynamically with notes data
```

## Exercise 0.6
```mermaid
sequenceDiagram
    participant browser
    participant server

    Note over browser: User navigates to the SPA version (see Exercise 0.5)
    Note over browser: User fills the form and clicks Save (no page reload)
    browser->>browser: Prevent default form submission
    browser->>browser: Create new note object
    browser->>browser: Update local notes array (notes.push(note))
    browser->>browser: Rerender notes list (redrawNotes())

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa (JSON with note content and date keys)
    activate server
    
    Note over server: server processes POST request
    server-->>browser: HTTP 201 Created
    deactivate server

    Note over browser: Browser stays on the same page, updates UI without reloading
    
```

