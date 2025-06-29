import { HiArrowNarrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const BreadCrumb = ({
  breadCrumbs,
}: {
  breadCrumbs: { label: string; link: string }[];
}) => {
  return (
    <nav>
      <ol className="flex space-x-2 text-sm text-gray-500">
        {breadCrumbs.map((crumb, index) => (
          <li key={index}>
            <Link to={crumb.link} className="hover:text-info transition-colors">
              {crumb.label}
            </Link>
            {index < breadCrumbs.length - 1 && (
              <span className="mx-1">
                <HiArrowNarrowRight className="inline-block" />
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadCrumb;
