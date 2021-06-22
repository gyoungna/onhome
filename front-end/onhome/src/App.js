
import ErrorBoundary from './component/route/ErrorBoundary';
import AppRouter from './component/route/RouterComponent';



function App() {
  return (
    <div>
      <ErrorBoundary>
        <AppRouter />
      </ErrorBoundary>
      
    </div>
  );
}




export default App;
