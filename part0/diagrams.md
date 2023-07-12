
## 0.4: New note diagram
```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: Request below sends object e.g. [{note: Hello There}]
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note with payload
    activate server
    server-->>browser: RESPONSE with Content-Type:text/html charset=UTF-8 (payload not shown)
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "ZDg", "date": "2023-07-11T19:46:07.943Z" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes

```


## 0.5: Single page app diagram
```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "ZDg", "date": "2023-07-11T19:46:07.943Z" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
```

## 0.6: New note in Single page app diagram


```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: JavaScript adds new_note to array, resets form and redraws notes.

    Note right of browser: Request below sends JSON object e.g "content": "wow", "date": "2023-07-12T05:13:43.064Z"
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: JSON object "message":"note created"
    deactivate server

   
   
    
```
