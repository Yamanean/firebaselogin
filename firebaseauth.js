import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Configuração do Firebase (corrigido storageBucket)
const firebaseConfig = {
    apiKey: "AIzaSyDyt9n8CVoFCwt7m2vLrIHJfLR1GfNBD6g",
    authDomain: "eight-e6918.firebaseapp.com",
    projectId: "eight-e6918",
    storageBucket: "eight-e6918.appspot.com", // Corrigido
    messagingSenderId: "472440707108",
    appId: "1:472440707108:web:70ac7b5bb437bb83a860b1",
    measurementId: "G-63BJ2GHBH1",
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
auth.languageCode = 'pt-br'; // Corrigido
const db = getFirestore();

// Função para exibir mensagens temporárias na interface
function showMessage(message, divId) {
    const messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(() => {
        messageDiv.style.opacity = 0;
    }, 5000);
}

// Cadastro de novos usuários
const signUp = document.getElementById('submitSignUp');
signUp.addEventListener('click', async (event) => {
    event.preventDefault();
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), { email, firstName, lastName });

        showMessage('Conta criada com sucesso', 'signUpMessage');
        window.location.href = 'index.html';
    } catch (error) {
        showMessage(error.code === 'auth/email-already-in-use' ? 'Endereço de email já existe' : 'Não foi possível criar usuário', 'signUpMessage');
    }
});

// Login de usuários
const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        localStorage.setItem('loggedInUserId', userCredential.user.uid);

        showMessage('Usuário logado com sucesso', 'signInMessage');
        window.location.href = 'homepage.html';
    } catch (error) {
        showMessage(error.code === 'auth/invalid-credential' ? 'Email ou Senha incorreta' : 'Essa conta não existe', 'signInMessage');
    }
});
