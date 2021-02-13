import React from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { Divider, Menu, Container, Icon } from 'semantic-ui-react'

import { apiBaseUrl } from './constants'
import { useStateValue, setPatientList, setDiagnosisList } from './state'
import { Patient, Diagnosis } from './types'

import PatientListPage from './PatientListPage'
import PatientDetail from './PatientDetail'
import Footer from './components/Footer'

//import ALogoBlack2 from './Icons/ALogoBlack2.js'

const App: React.FC<{ title: string }> = ({ title }) => {
  const [, dispatch] = useStateValue()

  React.useEffect(() => {
    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        )
        dispatch(setPatientList(patientListFromApi))
        const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        )

        dispatch(setDiagnosisList(diagnosisListFromApi))
      } catch (e) {
        console.error(e)
      }
    }
    fetchPatientList()
  }, [dispatch])

  return (
    <div>
      <Router>
        <Menu fixed="top" inverted>
          <Container fluid>
            <Menu.Item header>
              <Icon name="heartbeat" color="teal" size="large" />
              <Link to="/">{title}</Link>
            </Menu.Item>
            <Menu.Item
              className="right menu"
              as="a"
              href="https://github.com/I-keep-trying/fullstackopen-exercises/tree/master/part9/patientor-frontend-redo"
            >
              {' '}
              <Icon name="github" size="large" />
            </Menu.Item>
          </Container>
        </Menu>
        <Divider />
        <Divider />
        <Container>
          <Divider hidden />
          <Switch>
            <Route path="/patients/:id" render={() => <PatientDetail />} />
            <Route path="/" render={() => <PatientListPage />} />
          </Switch>
        </Container>
        <Container fluid className="Footer-container">
          <Footer />
        </Container>
      </Router>
    </div>
  )
}

export default App
