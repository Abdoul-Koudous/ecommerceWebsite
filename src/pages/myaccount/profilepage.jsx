import React, { useState } from "react";
import "./profiletab.scss";

const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCzK6DKnIE7MM_7cuaQAJlpxUHYs8yKDT3yg&s",
  };

  return (
    <div className="tab-content profile-tab">
      <h2>Mon Profil</h2>
      <div className="profile-header">
        <div className="profile-avatar">
          <img src={user.avatar} alt="User avatar" />
          <label htmlFor="avatar-upload" className="change-avatar">
            Changer
          </label>
          <input id="avatar-upload" type="file" accept="image/*" hidden />
        </div>
      </div>

      <form className="profile-form">
        <div className="form-group">
          <label>Nom complet</label>
          <input type="text" defaultValue={user.name} disabled={!editMode} />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" defaultValue={user.email} disabled={!editMode} />
        </div>

        <div className="form-group">
          <label>Mot de passe</label>
          <input type="password" placeholder="••••••••" disabled={!editMode} />
        </div>

        <div className="actions">
          {!editMode ? (
            <button
              type="button"
              className="btn-edit"
              onClick={() => setEditMode(true)}
            >
              Modifier le profil
            </button>
          ) : (
            <div className="edit-buttons">
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setEditMode(false)}
              >
                Annuler
              </button>
              <button type="submit" className="btn-save">
                Enregistrer
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
