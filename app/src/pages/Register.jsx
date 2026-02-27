import PersonForm from "../components/PersonForm"
import { Link } from 'react-router-dom'
import './Register.css'

export default function Register({ onSubmit }) {
  return (
    <div className="register-container">
      <PersonForm onSubmit={onSubmit} />
      <Link to="/">
        <button data-cy="back-home" className="back-button">Retour à l'accueil</button>
      </Link>
    </div>
  )
}