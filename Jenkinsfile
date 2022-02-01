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
        sh '''npm start &'''
        script {
          env.TEST = sh(script: "./node_modules/.bin/cypress run ",returnStatus:true)
          env.TEST = 1
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
        sh '''git config --global user.email "juan.antonio.lis@gmail.com"
git config --global user.name "Juan Antonio"
git remote set-url origin "https://jals-es:"$ghtoken"@github.com/jals-es/practica_jenkins.git"'''
        sh 'git commit -m "Pipeline ejecutada por $ejecutor. Motivo: $motivo"'
        sh 'git push --set-upstream origin master'
      }
    }

  }
  environment {
    ejecutor = 'Juan Antonio'
    motivo = 'Porque me obliga pepe'
    correo = 'narzano.nar@gmail.com'
    ghtoken = credentials('ghtokeni')
  }
}
