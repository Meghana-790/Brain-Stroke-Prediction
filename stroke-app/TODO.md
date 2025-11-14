# TODO: Create Chatbot Page with Chatbase Integration

- [x] Create new file: frontend/src/pages/ChatbotPage.jsx
  - Implement React component with useEffect to append Chatbase script to document.body
  - Include simple UI container for the chatbot
- [x] Update frontend/src/App.jsx
  - Import ChatbotPage
  - Add route: <Route path="/chatbot" element={<ChatbotPage/>}/>
- [x] Update frontend/src/components/Navbar.jsx
  - Add link: <Link to="/chatbot">Chatbot</Link>
- [ ] Followup: Run frontend app and test /chatbot page
