import { lazy } from 'react';
import Students from '../pages/Apps/Student/Students';
import Teachers from '../pages/Apps/Teacher/Teachers';
import ThesisAdvisory from '../pages/Apps/ThesisAdvisory';
import { ProtectedRoute, StudentRoute } from '../security/ProtectedRoute';

// <--Admin Imports-->
import Constancy from '../pages/Apps/Steps/One/TitleReservation';
import ProjectAproval from '../pages/Apps/Steps/Two/ProjectApproval';
import JuryAppointment from '../pages/Apps/Steps/Three/JuryAppointment';
import ReportReview from '../pages/Apps/Steps/Four/ReportReview';
import ConstancyThesis from '../pages/Apps/Steps/Five/ConstancyThesis';
import JuryNotifications from '../pages/Apps/Steps/Six/JuryNotifications';
import ThesisApproval from '../pages/Apps/Steps/Seven/ThesisApproval';
import PastingApproval from '../pages/Apps/Steps/Eight/PastingApproval';
import JuryRecomposition from '../pages/Apps/Steps/Extra/JuryRecomposition';
import ChangeAdvisor from '../pages/Apps/Steps/Extra/ChangeAdvisor';
import PassageExpansion from '../pages/Apps/Steps/Extra/PassageExpansion';
// <--End Admin Imports-->

// <--Students Imports-->
import ConstancyStudents from '../pages/Apps/StepsStudents/One/TitleReservation';
import ProjectApprovalStudents from '../pages/Apps/StepsStudents/Two/ProjectApproval';
import JuryAppointmentStudents from '../pages/Apps/StepsStudents/Three/JuryAppointment';
import ReportReviewStudents from '../pages/Apps/StepsStudents/Four/ReportReview';
import ConstancyThesisStudents from '../pages/Apps/StepsStudents/Five/ConstancyThesis';
import JuryNotificationsStudents from '../pages/Apps/StepsStudents/Six/JuryNotification';
import ThesisApprovalStudents from '../pages/Apps/StepsStudents/Seven/ThesisApproval';
import PastingApprovalStudent from '../pages/Apps/StepsStudents/Eight/PastingApproval';
// <--End Students Imports-->

import AuthRoute from '../security/AuthRoute ';
import Unauthorized from '../security/Unauthorized';
// const Index = lazy(() => import('../pages/Index'));
const Info = lazy(() => import('../pages/InstitutionalInfo'));
const Progress = lazy(() => import('../pages/Progress'));
const ProgressStudents = lazy(() => import('../pages/ProgressStudent'));
const Finance = lazy(() => import('../pages/Finance'));
const Crypto = lazy(() => import('../pages/Crypto'));
const Todolist = lazy(() => import('../pages/Apps/Todolist'));
const Mailbox = lazy(() => import('../pages/Apps/Mailbox'));
const Notes = lazy(() => import('../pages/Apps/Notes'));
const Contacts = lazy(() => import('../pages/Apps/Contacts'));
const Chat = lazy(() => import('../pages/Apps/Chat'));
const Scrumboard = lazy(() => import('../pages/Apps/Scrumboard'));
const Calendar = lazy(() => import('../pages/Apps/Calendar'));
const List = lazy(() => import('../pages/Apps/Invoice/List'));
const Preview = lazy(() => import('../pages/Apps/Invoice/Preview'));
const Add = lazy(() => import('../pages/Apps/Invoice/Add'));
const Edit = lazy(() => import('../pages/Apps/Invoice/Edit'));
const Tabs = lazy(() => import('../pages/Components/Tabs'));
const Accordians = lazy(() => import('../pages/Components/Accordians'));
const Modals = lazy(() => import('../pages/Components/Modals'));
const Cards = lazy(() => import('../pages/Components/Cards'));
const Carousel = lazy(() => import('../pages/Components/Carousel'));
const Countdown = lazy(() => import('../pages/Components/Countdown'));
const Counter = lazy(() => import('../pages/Components/Counter'));
const SweetAlert = lazy(() => import('../pages/Components/SweetAlert'));
const Timeline = lazy(() => import('../pages/Components/Timeline'));
const Notification = lazy(() => import('../pages/Components/Notification'));
const MediaObject = lazy(() => import('../pages/Components/MediaObject'));
const ListGroup = lazy(() => import('../pages/Components/ListGroup'));
const PricingTable = lazy(() => import('../pages/Components/PricingTable'));
const LightBox = lazy(() => import('../pages/Components/LightBox'));
const Alerts = lazy(() => import('../pages/Elements/Alerts'));
const Avatar = lazy(() => import('../pages/Elements/Avatar'));
const Badges = lazy(() => import('../pages/Elements/Badges'));
const Breadcrumbs = lazy(() => import('../pages/Elements/Breadcrumbs'));
const Buttons = lazy(() => import('../pages/Elements/Buttons'));
const Buttongroups = lazy(() => import('../pages/Elements/Buttongroups'));
const Colorlibrary = lazy(() => import('../pages/Elements/Colorlibrary'));
const DropdownPage = lazy(() => import('../pages/Elements/DropdownPage'));
const Infobox = lazy(() => import('../pages/Elements/Infobox'));
const Jumbotron = lazy(() => import('../pages/Elements/Jumbotron'));
const Loader = lazy(() => import('../pages/Elements/Loader'));
const Pagination = lazy(() => import('../pages/Elements/Pagination'));
const Popovers = lazy(() => import('../pages/Elements/Popovers'));
const Progressbar = lazy(() => import('../pages/Elements/Progressbar'));
const Search = lazy(() => import('../pages/Elements/Search'));
const Tooltip = lazy(() => import('../pages/Elements/Tooltip'));
const Treeview = lazy(() => import('../pages/Elements/Treeview'));
const Typography = lazy(() => import('../pages/Elements/Typography'));
const Widgets = lazy(() => import('../pages/Widgets'));
const FontIcons = lazy(() => import('../pages/FontIcons'));
const DragAndDrop = lazy(() => import('../pages/DragAndDrop'));
const Tables = lazy(() => import('../pages/Tables'));
const Basic = lazy(() => import('../pages/DataTables/Basic'));
const Advanced = lazy(() => import('../pages/DataTables/Advanced'));
const Skin = lazy(() => import('../pages/DataTables/Skin'));
const OrderSorting = lazy(() => import('../pages/DataTables/OrderSorting'));
const MultiColumn = lazy(() => import('../pages/DataTables/MultiColumn'));
const MultipleTables = lazy(() => import('../pages/DataTables/MultipleTables'));
const AltPagination = lazy(() => import('../pages/DataTables/AltPagination'));
const Checkbox = lazy(() => import('../pages/DataTables/Checkbox'));
const RangeSearch = lazy(() => import('../pages/DataTables/RangeSearch'));
const Export = lazy(() => import('../pages/DataTables/Export'));
const ColumnChooser = lazy(() => import('../pages/DataTables/ColumnChooser'));
const Profile = lazy(() => import('../pages/Users/Profile'));
const AccountSetting = lazy(() => import('../pages/Users/AccountSetting'));
const KnowledgeBase = lazy(() => import('../pages/Pages/KnowledgeBase'));
const ContactUsBoxed = lazy(() => import('../pages/Pages/ContactUsBoxed'));
const ContactUsCover = lazy(() => import('../pages/Pages/ContactUsCover'));
const Faq = lazy(() => import('../pages/Pages/Faq'));
const ComingSoonBoxed = lazy(() => import('../pages/Pages/ComingSoonBoxed'));
const ComingSoonCover = lazy(() => import('../pages/Pages/ComingSoonCover'));
const ERROR404 = lazy(() => import('../pages/Pages/Error404'));
const ERROR500 = lazy(() => import('../pages/Pages/Error500'));
const ERROR503 = lazy(() => import('../pages/Pages/Error503'));
const Maintenence = lazy(() => import('../pages/Pages/Maintenence'));
const LoginCover = lazy(() => import('../pages/Authentication/LoginCover'));
const RecoverIdCover = lazy(() => import('../pages/Authentication/RecoverIdCover'));
const About = lazy(() => import('../pages/About'));
const Error = lazy(() => import('../components/Error'));
const Charts = lazy(() => import('../pages/Charts'));
const FormBasic = lazy(() => import('../pages/Forms/Basic'));
const FormInputGroup = lazy(() => import('../pages/Forms/InputGroup'));
const FormLayouts = lazy(() => import('../pages/Forms/Layouts'));
const Validation = lazy(() => import('../pages/Forms/Validation'));
const InputMask = lazy(() => import('../pages/Forms/InputMask'));
const Select2 = lazy(() => import('../pages/Forms/Select2'));
const Touchspin = lazy(() => import('../pages/Forms/TouchSpin'));
const CheckBoxRadio = lazy(() => import('../pages/Forms/CheckboxRadio'));
const Switches = lazy(() => import('../pages/Forms/Switches'));
const Wizards = lazy(() => import('../pages/Forms/Wizards'));
const FileUploadPreview = lazy(() => import('../pages/Forms/FileUploadPreview'));
const QuillEditor = lazy(() => import('../pages/Forms/QuillEditor'));
const MarkDownEditor = lazy(() => import('../pages/Forms/MarkDownEditor'));
const DateRangePicker = lazy(() => import('../pages/Forms/DateRangePicker'));
const Clipboard = lazy(() => import('../pages/Forms/Clipboard'));

const routes = [
    // Ruta de inicio de sesión protegida
    {
        path: '/auth/inicio-sesion',
        element: (
            <AuthRoute>
                <LoginCover />
            </AuthRoute>
        ),
        layout: 'blank',
    },
    {
        path: '/unauthorized',
        element: <Unauthorized />,
    },
    {
        path: '/auth/cambiar-contrasena',
        element: <RecoverIdCover />,
        layout: 'blank',
    },
    // perfil
    {
        path: '/usuario/perfil',
        element: <Profile />,
    },
    ///---INICIO----------------------------------------------------------------/////

    ////////
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <Info />
            </ProtectedRoute>
        ),
    },
    {
        path: 'apps/estudiantes',
        element: (
            <ProtectedRoute>
                <Students />
            </ProtectedRoute>
        ),
    },
    {
        path: 'apps/docentes',
        element: (
            <ProtectedRoute>
                <Teachers />
            </ProtectedRoute>
        ),
    },
    {
        path: 'apps/paso/constancia-de-filtro',
        element: (
            <ProtectedRoute>
                <Constancy />
            </ProtectedRoute>
        ),
    },
    {
        path: 'apps/paso/aprobacion-de-proyecto',
        element: (
            <ProtectedRoute>
                <ProjectAproval />
            </ProtectedRoute>
        ),
    },
    {
        path: 'apps/paso/designacion-de-jurados',
        element: (
            <ProtectedRoute>
                <JuryAppointment />
            </ProtectedRoute>
        ),
    },
    {
        path: 'apps/paso/revision-de-reporte',
        element: (
            <ProtectedRoute>
                <ReportReview />
            </ProtectedRoute>
        ),
    },
    {
        path: 'apps/paso/extra/cambio-de-asesor',
        element: (
            <ProtectedRoute>
                <ChangeAdvisor />
            </ProtectedRoute>
        ),
    },
    {
        path: 'apps/paso/extra/ampliacion-de-proceso',
        element: (
            <ProtectedRoute>
                <PassageExpansion />
            </ProtectedRoute>
        ),
    },
    {
        path: 'apps/paso/extra/recomposicion-de-jurados',
        element: (
            <ProtectedRoute>
                <JuryRecomposition />
            </ProtectedRoute>
        ),
    },
    {
        path: 'apps/paso/constancia-de-tesis',
        element: (
            <ProtectedRoute>
                <ConstancyThesis />
            </ProtectedRoute>
        ),
    },
    {
        path: 'apps/paso/notificacion-de-jurados',
        element: (
            <ProtectedRoute>
                <JuryNotifications />
            </ProtectedRoute>
        ),
    },
    {
        path: 'apps/paso/aprobacion-de-tesis',
        element: (
            <ProtectedRoute>
                <ThesisApproval />
            </ProtectedRoute>
        ),
    },
    {
        path: 'apps/paso/aprobacion-de-empastados',
        element: (
            <ProtectedRoute>
                <PastingApproval />
            </ProtectedRoute>
        ),
    },
    // Estudiantes
    {
        path: 'apps/paso-estudiante/constancia-de-filtro',
        element: (
            <StudentRoute>
                <ConstancyStudents />
            </StudentRoute>
        ),
    },
    {
        path: 'apps/paso-estudiante/aprobacion-de-proyecto',
        element: (
            <StudentRoute>
                <ProjectApprovalStudents />
            </StudentRoute>
        ),
    },
    {
        path: 'apps/paso-estudiante/designacion-de-jurados',
        element: (
            <StudentRoute>
                <JuryAppointmentStudents />
            </StudentRoute>
        ),
    },
    {
        path: 'apps/paso-estudiante/revision-de-reporte',
        element: (
            <StudentRoute>
                <ReportReviewStudents />
            </StudentRoute>
        ),
    },
    {
        path: 'apps/paso-estudiante/constancia-de-tesis',
        element: (
            <StudentRoute>
                <ConstancyThesisStudents />
            </StudentRoute>
        ),
    },
    {
        path: 'apps/paso-estudiante/notificacion-de-jurados',
        element: (
            <StudentRoute>
                <JuryNotificationsStudents />
            </StudentRoute>
        ),
    },
    {
        path: 'apps/paso-estudiante/aprobacion-de-tesis',
        element: (
            <StudentRoute>
                <ThesisApprovalStudents />
            </StudentRoute>
        ),
    },
    {
        path: 'apps/paso-estudiante/aprobacion-de-empastados',
        element: (
            <StudentRoute>
                <PastingApprovalStudent />
            </StudentRoute>
        ),
    },
    // Estudiantes Fin
    {
        path: 'apps/paso-estudiante/asesoria-tesis',
        element: (
            <ProtectedRoute>
                <ThesisAdvisory />
            </ProtectedRoute>
        ),
    },
    {
        path: '/progreso-estudiante',
        element: (
            <StudentRoute>
                <ProgressStudents />
            </StudentRoute>
        ),
    },

    ///---FIN----------------------------------------------------------------/////
    {
        path: '/progreso',
        element: <Progress />,
    },
    // finance page
    {
        path: '/finance',
        element: <Finance />,
    },
    // crypto page
    {
        path: '/crypto',
        element: <Crypto />,
    },
    {
        path: '/apps/todolist',
        element: <Todolist />,
    },
    {
        path: '/apps/notes',
        element: <Notes />,
    },
    {
        path: '/apps/contacts',
        element: <Contacts />,
    },

    {
        path: '/apps/mailbox',
        element: <Mailbox />,
    },
    {
        path: '/apps/invoice/list',
        element: <List />,
    },
    // Apps page
    {
        path: '/apps/chat',
        element: <Chat />,
    },
    {
        path: '/apps/scrumboard',
        element: <Scrumboard />,
    },
    {
        path: '/apps/calendar',
        element: <Calendar />,
    },
    // preview page
    {
        path: '/apps/factura/previsualziar',
        element: <Preview />,
    },
    {
        path: '/apps/invoice/add',
        element: <Add />,
    },
    {
        path: '/apps/invoice/edit',
        element: <Edit />,
    },
    // components page
    {
        path: '/components/tabs',
        element: <Tabs />,
    },
    {
        path: '/components/accordions',
        element: <Accordians />,
    },
    {
        path: '/components/modals',
        element: <Modals />,
    },
    {
        path: '/components/cards',
        element: <Cards />,
    },
    {
        path: '/components/carousel',
        element: <Carousel />,
    },
    {
        path: '/components/countdown',
        element: <Countdown />,
    },
    {
        path: '/components/counter',
        element: <Counter />,
    },
    {
        path: '/components/sweetalert',
        element: <SweetAlert />,
    },
    {
        path: '/components/timeline',
        element: <Timeline />,
    },
    {
        path: '/components/notifications',
        element: <Notification />,
    },
    {
        path: '/components/media-object',
        element: <MediaObject />,
    },
    {
        path: '/components/list-group',
        element: <ListGroup />,
    },
    {
        path: '/components/pricing-table',
        element: <PricingTable />,
    },
    {
        path: '/components/lightbox',
        element: <LightBox />,
    },
    // elements page
    {
        path: '/elements/alerts',
        element: <Alerts />,
    },
    {
        path: '/elements/avatar',
        element: <Avatar />,
    },
    {
        path: '/elements/badges',
        element: <Badges />,
    },
    {
        path: '/elements/breadcrumbs',
        element: <Breadcrumbs />,
    },
    {
        path: '/elements/buttons',
        element: <Buttons />,
    },
    {
        path: '/elements/buttons-group',
        element: <Buttongroups />,
    },
    {
        path: '/elements/color-library',
        element: <Colorlibrary />,
    },
    {
        path: '/elements/dropdown',
        element: <DropdownPage />,
    },
    {
        path: '/elements/infobox',
        element: <Infobox />,
    },
    {
        path: '/elements/jumbotron',
        element: <Jumbotron />,
    },
    {
        path: '/elements/loader',
        element: <Loader />,
    },
    {
        path: '/elements/pagination',
        element: <Pagination />,
    },
    {
        path: '/elements/popovers',
        element: <Popovers />,
    },
    {
        path: '/elements/progress-bar',
        element: <Progressbar />,
    },
    {
        path: '/elements/search',
        element: <Search />,
    },
    {
        path: '/elements/tooltips',
        element: <Tooltip />,
    },
    {
        path: '/elements/treeview',
        element: <Treeview />,
    },
    {
        path: '/elements/typography',
        element: <Typography />,
    },

    // charts page
    {
        path: '/charts',
        element: <Charts />,
    },
    // widgets page
    {
        path: '/widgets',
        element: <Widgets />,
    },
    //  font-icons page
    {
        path: '/font-icons',
        element: <FontIcons />,
    },
    //  Drag And Drop page
    {
        path: '/dragndrop',
        element: <DragAndDrop />,
    },
    //  Tables page
    {
        path: '/tables',
        element: <Tables />,
    },
    // Data Tables
    {
        path: '/datatables/basic',
        element: <Basic />,
    },
    {
        path: '/datatables/advanced',
        element: <Advanced />,
    },
    {
        path: '/datatables/skin',
        element: <Skin />,
    },
    {
        path: '/datatables/order-sorting',
        element: <OrderSorting />,
    },
    {
        path: '/datatables/multi-column',
        element: <MultiColumn />,
    },
    {
        path: '/datatables/multiple-tables',
        element: <MultipleTables />,
    },
    {
        path: '/datatables/alt-pagination',
        element: <AltPagination />,
    },
    {
        path: '/datatables/checkbox',
        element: <Checkbox />,
    },
    {
        path: '/datatables/range-search',
        element: <RangeSearch />,
    },
    {
        path: '/datatables/export',
        element: <Export />,
    },
    {
        path: '/datatables/column-chooser',
        element: <ColumnChooser />,
    },
    // Users page
    {
        path: '/users/user-account-settings',
        element: <AccountSetting />,
    },
    // pages
    {
        path: '/pages/knowledge-base',
        element: <KnowledgeBase />,
    },
    {
        path: '/pages/contact-us-boxed',
        element: <ContactUsBoxed />,
        layout: 'blank',
    },
    {
        path: '/pages/contact-us-cover',
        element: <ContactUsCover />,
        layout: 'blank',
    },
    {
        path: '/pages/faq',
        element: <Faq />,
    },
    {
        path: '/pages/coming-soon-boxed',
        element: <ComingSoonBoxed />,
        layout: 'blank',
    },
    {
        path: '/pages/coming-soon-cover',
        element: <ComingSoonCover />,
        layout: 'blank',
    },
    {
        path: '/pages/error404',
        element: <ERROR404 />,
        layout: 'blank',
    },
    {
        path: '/pages/error500',
        element: <ERROR500 />,
        layout: 'blank',
    },
    {
        path: '/pages/error503',
        element: <ERROR503 />,
        layout: 'blank',
    },
    {
        path: '/pages/maintenence',
        element: <Maintenence />,
        layout: 'blank',
    },
    //forms page
    {
        path: '/forms/basic',
        element: <FormBasic />,
    },
    {
        path: '/forms/input-group',
        element: <FormInputGroup />,
    },
    {
        path: '/forms/layouts',
        element: <FormLayouts />,
    },
    {
        path: '/forms/validation',
        element: <Validation />,
    },
    {
        path: '/forms/input-mask',
        element: <InputMask />,
    },
    {
        path: '/forms/select2',
        element: <Select2 />,
    },
    {
        path: '/forms/touchspin',
        element: <Touchspin />,
    },
    {
        path: '/forms/checkbox-radio',
        element: <CheckBoxRadio />,
    },
    {
        path: '/forms/switches',
        element: <Switches />,
    },
    {
        path: '/forms/wizards',
        element: <Wizards />,
    },
    {
        path: '/forms/file-upload',
        element: <FileUploadPreview />,
    },
    {
        path: '/forms/quill-editor',
        element: <QuillEditor />,
    },
    {
        path: '/forms/markdown-editor',
        element: <MarkDownEditor />,
    },
    {
        path: '/forms/date-picker',
        element: <DateRangePicker />,
    },
    {
        path: '/forms/clipboard',
        element: <Clipboard />,
    },
    {
        path: '/about',
        element: <About />,
        layout: 'blank',
    },
    {
        path: '*',
        element: <Error />,
        layout: 'blank',
    },
];

export { routes };
