/* eslint-disable react-hooks/immutability */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import ManagerPage from './ManagerPage';
import { useAuth } from '../../context/AuthContext';

const GestionUtilisateurs = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [equipes, setEquipes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'employee',
    equipe_id: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users');
      setUsers(response.data.users);
      setEquipes(response.data.equipes);
    } catch (error) {
      console.error('Erreur chargement:', error);
      showMessage('error', 'Erreur lors du chargement des utilisateurs');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const openModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        equipe_id: user.equipe_id || ''
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: '',
        email: '',
        role: 'employee',
        equipe_id: ''
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingUser) {
        await api.put(`/users/${editingUser.id}`, formData);
        showMessage('success', '✅ Utilisateur modifié avec succès');
      } else {
        await api.post('/users', formData);
        showMessage('success', '✅ Utilisateur créé. Un email a été envoyé.');
      }
      setShowModal(false);
      fetchUsers();
    } catch (error) {
      console.error('Erreur:', error);
      showMessage('error', error.response?.data?.message || '❌ Erreur lors de l\'opération');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        setLoading(true);
        await api.delete(`/users/${id}`);
        showMessage('success', '✅ Utilisateur supprimé avec succès');
        fetchUsers();
      } catch (error) {
        console.error('Erreur suppression:', error);
        showMessage('error', error.response?.data?.message || '❌ Erreur lors de la suppression');
      } finally {
        setLoading(false);
      }
    }
  };

  const resendActivation = async (id) => {
    try {
      setLoading(true);
      await api.post(`/users/${id}/resend-activation`);
      showMessage('success', '📧 Email d\'activation renvoyé avec succès');
    } catch (error) {
      console.error('Erreur envoi email:', error);
      showMessage('error', '❌ Erreur lors de l\'envoi de l\'email');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-red-100 text-red-800'
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <ManagerPage title="Gestion des Utilisateurs">
      {/* Message de notification */}
      {message.text && (
        <div className={`mb-4 p-4 rounded-lg transition-all duration-300 ${
          message.type === 'success' 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          <div className="flex items-center gap-2">
            <span className="text-lg">{message.type === 'success' ? '✅' : '❌'}</span>
            <span className="font-medium">{message.text}</span>
          </div>
        </div>
      )}

      {/* Bouton Ajouter */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={() => openModal()}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
          disabled={loading}
        >
          <span className="text-lg">➕</span>
          Ajouter un utilisateur
        </button>
      </div>

      {/* Tableau des utilisateurs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading && !users.length ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Équipe</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    Aucun utilisateur trouvé
                  </td>
                </tr>
              ) : (
                users.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{user.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                        user.role === 'manager' 
                          ? 'bg-purple-100 text-purple-800 border border-purple-200' 
                          : 'bg-blue-100 text-blue-800 border border-blue-200'
                      }`}>
                        {user.role === 'manager' ? '👔 Manager' : '👤 Employé'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {user.equipe?.nom || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusBadge(user.status)} border ${
                        user.status === 'active' ? 'border-green-200' : 'border-red-200'
                      }`}>
                        {user.status === 'active' ? '🟢 Actif' : '🔴 Inactif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-3">
                        <button
                          onClick={() => openModal(user)}
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-lg transition-all"
                          title="Modifier"
                        >
                          ✏️
                        </button>
                        
                        {user.id !== currentUser?.id && (
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-all"
                            title="Supprimer"
                          >
                            🗑️
                          </button>
                        )}
                        
                        {user.status === 'inactive' && (
                          <button
                            onClick={() => resendActivation(user.id)}
                            className="text-orange-600 hover:text-orange-800 hover:bg-orange-50 p-2 rounded-lg transition-all"
                            title="Renvoyer l'email d'activation"
                          >
                            📧
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Formulaire */}
      {showModal && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setShowModal(false)}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                {editingUser ? '✏️ Modifier' : '➕ Ajouter'} un utilisateur
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                    placeholder="Jean Dupont"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    required
                    placeholder="jean.dupont@example.com"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rôle <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="employee">👤 Employé</option>
                    <option value="manager">👔 Manager</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Équipe
                  </label>
                  <select
                    name="equipe_id"
                    value={formData.equipe_id}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Sélectionner une équipe</option>
                    {equipes.map(equipe => (
                      <option key={equipe.id} value={equipe.id}>
                        {equipe.nom}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-lg transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Traitement...' : (editingUser ? 'Mettre à jour' : 'Créer')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2.5 rounded-lg transition-all duration-200"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </ManagerPage>
  );
};

export default GestionUtilisateurs;