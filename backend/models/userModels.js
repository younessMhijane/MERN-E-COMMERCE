import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, "Veuillez entrer une adresse e-mail valide"],
    },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false ,required:true }, // Par défaut, le rôle est "user"
    resetCode: { type: String }, // Code temporaire pour la réinitialisation
    resetCodeExpires: { type: Date }, // Expiration du code
  },
  {
    timestamps: true, // Ajoute createdAt et updatedAt automatiquement
  }
);

const User = mongoose.model("User", userSchema);
export default User;