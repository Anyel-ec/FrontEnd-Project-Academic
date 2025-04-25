import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const StepMenuList = ({ steps, t }) => {
    return (
        <>
            {steps.map((step, index) => (
                <li key={index} className="nav-item">
                    <NavLink to={step.path} className="group">
                        <div className="flex items-center">
                            <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t(step.label)}</span>
                        </div>
                    </NavLink>
                </li>
            ))}
        </>
    );
};

StepMenuList.propTypes = {
    steps: PropTypes.arrayOf(
        PropTypes.shape({
            path: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
    t: PropTypes.func.isRequired,
};

export default StepMenuList;
