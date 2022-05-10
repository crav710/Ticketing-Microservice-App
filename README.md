# Ticketing App Using Microservice Architecture 

## Description 
#### Ticketing App is used for booking popular shows tickets. Users can post tickets to sell and purchase tickets.  

### Tech Stack 
- Node js Express & typeScript  :For creating Backend Services
- mongo DB 		   :Database 
- React            :For Client
- Docker           :Creating conatiners
- Kubernetes       :Running multiple container and networking  
- Skaffold         :Automating Build process 
- ingress nginx    :Load Balancer + ingress controller  (https://kubernetes.github.io/ingress-nginx/deploy/#quick-start)


List of Microservices Used:: 
- Auth Service        : User Login/Logout/Signup/Signin 

##### Auth Service 
The key highlights of authentication service 
-###### Exception Handling:  It uses express-validation and Custom defined Errors subclass of Errors. The errors return are consistent and cover lots of scenarios for a production ready code.
-###### DataBaseIntegration: Defining interfaces for User model and User Document so that errors can be avoided. 
-###### Password Hashing   : Implementing password hasing using scrypt as Async. Password hasing improves security on response send to client. 


