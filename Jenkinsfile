pipeline {
  agent any
  stages {
    stage('linter') {
      steps {
        sh '''npm install
npm run lint'''
      }
    }

  }
  environment {
    ejecutor = 'Juan Antonio'
    motivo = 'Porque me obliga pepe'
    correo = 'narzano.nar@gmail.com'
  }
}