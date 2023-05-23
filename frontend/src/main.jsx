import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import { store, persistor } from './app/store'
import { Provider } from 'react-redux' /* Provider -> Make something available for all children comps */
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> 
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter><Routes>
          <Route path="/*" element={<App />} />
        </Routes></BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
