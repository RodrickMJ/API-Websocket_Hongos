import mongoose, {Document, Schema} from "mongoose";
import UserInterface from "../../users/domain/UserInterface";

interface userDocument extends Omit<UserInterface, 'id'>, Document {}

const UserSchema = new Schema<userDocument>({
    name:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    rol: {
        type: String,
        enum: ['Administrador', 'Asistente'],
        required: true
    },

    passwordResetCode: {
        type: String,
        required: false
    },
    passwordResetExpires: {
        type: String,
        required: false
    }

});

const UserModel = mongoose.model<userDocument>('Users',UserSchema);

export default UserModel;