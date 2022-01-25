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
        sh 'npm run test'
      }
    }

  }
  environment {
    ejecutor = 'Juan Antonio'
    motivo = 'Porque me obliga pepe'
    correo = 'narzano.nar@gmail.com'
  }
}