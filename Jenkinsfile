pipeline {
  agent any
  stages {
    stage('linter') {
      steps {
        sh '''npm install
npm run lint'''
      }
    }

    stage('test') {
      steps {
        sh '''npm start &
sleep 5
npm run cypress'''
      }
    }

  }
  environment {
    ejecutor = 'Juan Antonio'
    motivo = 'Porque me obliga pepe'
    correo = 'narzano.nar@gmail.com'
  }
}