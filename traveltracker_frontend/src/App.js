import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Amplify, { API, Auth, graphqlOperation } from 'aws-amplify';
import awsExports from "./aws-exports";
import { AmplifySignOut,withAuthenticator } from '@aws-amplify/ui-react'
Amplify.configure(awsExports);


function App() {
  return (
    <div className = "TravelTrackerApp">
      <AmplifySignOut />
      <h2>App Stuff</h2>
    </div>
      
  )
}

export default withAuthenticator(App);