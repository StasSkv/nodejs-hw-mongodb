import { welcome } from '../controllers/home.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import router from './contacts.js';

router.get('/', ctrlWrapper(welcome));

export default router;
