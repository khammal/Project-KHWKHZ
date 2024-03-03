// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './components/Home';
// import CreateListingForm from './components/CreateListingForm';
// import UpdateListingForm from './components/UpdateListingForm';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/create" element={<CreateListingForm />} />
//           <Route path="/update/:id" element={<UpdateListingForm />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateListingForm from './components/CreateListingForm';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateListingForm />} />
          <Route path="/create/:id" element={<CreateListingForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

