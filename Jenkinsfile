pipeline {
  agent any
  stages {
    stage('linter') {
      steps {
        sh '''npm install
npm run build
npm run lint'''
      }
    }

    stage('test') {
      steps {
        sh '''npm start &
sleep 10'''
        script {
          env.TEST = sh(script: "./node_modules/.bin/cypress run ",returnStatus:true)
        }

      }
    }

    stage('updateReadme') {
      steps {
        sh 'node ./jenkinsScripts/update_readme.js $TEST'
      }
    }

    stage('pushChanges') {
      steps {
        sh 'git add --all'
        sh 'git commit -m "commit changes"'
        sh 'git push'
        sh 'echo "Pipeline ejecutada por $ejecutor. Motivo: $motivo"'
      }
    }

  }
  environment {
    ejecutor = 'Juan Antonio'
    motivo = 'Porque me obliga pepe'
    correo = 'narzano.nar@gmail.com'
  }
}