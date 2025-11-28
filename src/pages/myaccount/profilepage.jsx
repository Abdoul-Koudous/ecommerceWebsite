import React, { useState,useContext } from "react";
import "./profiletab.scss";
import { UserContext } from "../../UserContext/UserContext";
import { ToastContext } from "../../context/ToastContext";
import { uploadImage } from "../utils/api";
import CircularProgress from "../../components/CircularProgress/CircularProgress";

const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { openToast } = useContext(ToastContext);

  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  

  const onChangeFile = async (e, apiEndPoint) => {
    try {
      setUploading(true);
      const files = e.target.files;

      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type)) {
          openToast("error", "Image invalide (jpg, png ou webp uniquement)");
          setUploading(false);
          return;
        }
        formData.append("avatar", file); // Assurez-vous que le backend attend "avatar"
      }

      const res = await uploadImage(apiEndPoint, formData);
      setUploading(false);

      if (res.error) {
        openToast("error", res.message || "Erreur upload");
        return;
      }

      // Mettre à jour le preview pour affichage instantané
      setPreviews([res.avatar]);

      // 🔥 Mettre à jour le UserContext pour que Header reflète le nouvel avatar
      setUser({ ...user, avatar: res.avatar });

      openToast("success", "Avatar mis à jour avec succès !");
    } catch (error) {
      console.log(error);
      setUploading(false);
      openToast("error", "Erreur lors de l'upload");
    }
  };




  return (
    <div className="tab-content profile-tab">
      <h2>Mon Profil</h2>
      <div className="profile-header">
        <div className="profile-avatar">
          {uploading ? (
            <CircularProgress />
          ) : (
            <>
              {previews.length > 0 ? (
                previews.map((img, index) => (
                  <img src={img} key={index} alt="User avatar" />
                ))
              ) : (
                <img
                  src={previews[0] || user?.avatar || "/user.jpg"}
                  alt="User avatar"
                />
              )}
            </>
          )}
          <label htmlFor="avatar-upload" className="change-avatar">
            Changer
          </label>
          <input 
          id="avatar-upload" 
          type="file" 
          accept="image/*" 
          hidden 
          onChange={(e) => onChangeFile(e, "/api/users/user-avatar")}
          name="avatar"
          />
        </div>
      </div>

      <form className="profile-form">
        <div className="form-group">
          <label>Nom complet</label>
          <input type="text" defaultValue={user?.name} disabled={!editMode} />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" defaultValue={user?.email} disabled={!editMode} />
        </div>

        <div className="form-group">
          <label>Téléphone</label>
          <input type="mobile" defaultValue={user?.mobile} disabled={!editMode} />
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
