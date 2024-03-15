import express from 'express';
import messages from '@/modules/messages/controller';
import users from '@/modules/users/controller';
import sprints from '@/modules/sprints/controller';
import templates from '@/modules/templates/controller';
import jsonErrorHandler from './middleware/jsonErrors';

const app = express();

app.use(express.json());
app.use('/messages', messages);
app.use('/users', users);
app.use('/sprints', sprints);
app.use('/templates', templates);

app.use(jsonErrorHandler);

export default app;
