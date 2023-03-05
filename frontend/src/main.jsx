import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import store from './app/store'
import { Provider } from 'react-redux' /* Provider -> Make something available for all children comps */

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> 
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
