# Database Migration to MongoDB - TODO

## Completed Tasks
- [x] Analyze existing codebase and confirm MongoDB usage
- [x] Add Report model to models.js with schema: id, title, content, authorId, date, employeeResponsible
- [x] Export Report model in models.js
- [x] Import Report model in server.js
- [x] Add full CRUD API routes for reports in server.js (GET, POST, PUT, DELETE)
- [x] Update seedData.js to include employeeResponsible in sample report

## Pending Tasks
- [ ] Install and start MongoDB service
- [ ] Run seedData.js to populate MongoDB with Report data
- [ ] Verify that the server starts without errors
- [ ] Test API endpoints for reports
- [ ] Ensure frontend components work with the new Report model

## Notes
- The application was already using MongoDB with Mongoose.
- The main issue was the missing Report model, which has been added and migrated.
- MongoDB needs to be installed and running for seeding and server operation.
- To complete the migration: Install MongoDB, start the service, run `node backend/seedData.js`, then `node backend/server.js`.
