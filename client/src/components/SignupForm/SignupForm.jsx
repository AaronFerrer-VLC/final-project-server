import { useState, useEffect } from "react"
import { Form, Button } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import authServices from "../../services/auth.services"

const SignupForm = () => {

    const navigate = useNavigate()

    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: '',
        avatar: '',
        firstName: '',
        familyName: '',
        socialNetworksProfiles: [],
        bio: '',
        favoriteGenres: []
    })

    // Manejo de cambios en inputs
    const handleInputChange = (e, index = null) => {
        const { value, name } = e.target

        if (index !== null) {
            // Si hay un índice (para redes sociales), actualizamos esa URL en el array
            const updatedSocialNetworks = [...signupData.socialNetworksProfiles]
            updatedSocialNetworks[index] = value
            setSignupData({ ...signupData, socialNetworksProfiles: updatedSocialNetworks })
        } else {
            // Para otros campos
            setSignupData({ ...signupData, [name]: value })
        }
    }

    // Manejo de cambio de avatar (archivos)
    const handleAvatarChange = (e) => {
        const file = e.target.files[0]
        setSignupData({ ...signupData, avatar: file })
    }

    // Manejo de cambio en selección de redes sociales
    const handleAddSocialNetwork = () => {
        setSignupData({
            ...signupData,
            socialNetworksProfiles: [...signupData.socialNetworksProfiles, '']
        })
    }

    const handleRemoveSocialNetwork = (index) => {
        const updatedSocialNetworks = signupData.socialNetworksProfiles.filter((_, i) => i !== index)
        setSignupData({ ...signupData, socialNetworksProfiles: updatedSocialNetworks })
    }

    // Manejo de cambio en selección de géneros favoritos
    const handleGenreChange = (e) => {
        const { value, checked } = e.target
        setSignupData((prevState) => {
            const genres = checked
                ? [...prevState.favoriteGenres, value]
                : prevState.favoriteGenres.filter((genre) => genre !== value)
            return { ...prevState, favoriteGenres: genres }
        })
    }

    // Limpieza de objetos URL para evitar fugas de memoria
    useEffect(() => {
        return () => {
            if (signupData.avatar) {
                URL.revokeObjectURL(signupData.avatar)
            }
        }
    }, [signupData.avatar])

    const handleFormSubmit = e => {
        e.preventDefault()

        authServices
            .signupUser(signupData)
            .then(() => navigate('/inicio-sesion'))
            .catch(err => console.log(err))
    }

    return (
        <div className="SignupForm">
            <Form onSubmit={handleFormSubmit}>

                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Nombre de usuario</Form.Label>
                    <Form.Control
                        type="text"
                        value={signupData.username}
                        onChange={handleInputChange}
                        name="username"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        value={signupData.password}
                        onChange={handleInputChange}
                        name="password"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={signupData.email}
                        onChange={handleInputChange}
                        name="email"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="avatar">
                    <Form.Label>Avatar</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={handleAvatarChange}
                        name="avatar"
                    />
                    {signupData.avatar && (
                        <img
                            src={URL.createObjectURL(signupData.avatar)}
                            alt="Avatar"
                            className="mt-2"
                            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                        />
                    )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="firstName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        value={signupData.firstName}
                        onChange={handleInputChange}
                        name="firstName"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="familyName">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control
                        type="text"
                        value={signupData.familyName}
                        onChange={handleInputChange}
                        name="familyName" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="socialNetworksProfiles">
                    <Form.Label>Redes Sociales</Form.Label>
                    {signupData.socialNetworksProfiles.map((url, index) => (
                        <div key={index} className="d-flex mb-2">
                            <Form.Control
                                type="url"
                                placeholder={`URL de red social #${index + 1}`}
                                value={url}
                                onChange={(e) => handleInputChange(e, index)}
                                name="socialNetworksProfiles"
                            />
                            <Button
                                variant="dark"
                                className="ms-2"
                                onClick={() => handleRemoveSocialNetwork(index)}
                            >
                                Eliminar
                            </Button>
                        </div>
                    ))}
                </Form.Group>
                <Button variant="dark" onClick={handleAddSocialNetwork} size="sm">
                    Añadir otra red social
                </Button>

                <Form.Group className="mb-3" controlId="bio">
                    <Form.Label>Descripción Personal</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={signupData.bio}
                        onChange={handleInputChange}
                        name="bio"
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="favoriteGenres">
                    <Form.Label>Géneros Favoritos</Form.Label>
                    {["Drama", "Acción", "Terror", "Comedia", "Romántico"].map((genre) => (
                        <Form.Check
                            key={genre}
                            type="checkbox"
                            label={genre}
                            value={genre}
                            checked={signupData.favoriteGenres.includes(genre)}
                            onChange={handleGenreChange}
                        />
                    ))}
                    <div className="mt-2">
                        {signupData.favoriteGenres.map((genre) => (
                            <span key={genre} className="badge bg-secondary me-2">{genre}</span>
                        ))}
                    </div>
                </Form.Group>

                <div className="d-grid">
                    <Button variant="dark" type="submit">Registrarme</Button>
                </div>

            </Form>
        </div >
    )
}
export default SignupForm