import mongoose from 'mongoose';

// Validator function for email format
const emailValidator = function(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
  return re.test(String(email).toLowerCase());
};

// Validator function for phone number format (simple example, adapt as needed)
const phoneValidator = function(phone) {
  const re = /^\d{10}$/; // Example for 10 digit numbers, modify as per your needs
  return re.test(String(phone));
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        return value === this.password;
      },
      message: 'Passwords do not match'
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: emailValidator,
      message: 'Invalid email format'
    }
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: phoneValidator,
      message: 'Invalid phone number format'
    }
  },
  profilePic: {
    type: String,
    default: ''
  },
  isFrozen: {
    type: Boolean,
    default: false
  },
  coverPhoto: {
    type: String,
    default: '' 
  },
  bio: {
    type: String,
  },
  friends: {
    type: [String],
    default: []
  },
  followers: {
    type: [String],
    default: []
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'male', 'female'],
    required: true
  }
},
{
  timestamps: true // Corrected to 'timestamps' with an 's'
}
);

const User = mongoose.model('User', userSchema);
export default User;