import { Alert, Button, Dropdown, Modal, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import Editor from '../../../../lib/editor/EditorWithUseQuill';
import zeapApiSlice from '../../../../redux/services/zeapApi.slice';
import Loading from '../../../../lib/Loading';
import {
  helpCenterCategoryOptions,
  helpCenterSubCategoryOptions,
} from '../../../../utils/helpCenterStructure';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { globalSelectors } from '../../../../redux/services/global.slice';
import { useSelector } from 'react-redux';
import { IoIosClose } from 'react-icons/io';

const stages = [
  {
    label: 'What is the title of the help article?',
    value: 1,
  },
  {
    label: 'Choose a category for the help article',
    value: 2,
  },
  {
    label: 'Choose a sub-category for the help article',
    value: 3,
  },
  {
    label: 'Write the content of the help article',
    value: 4,
  },
  {
    label: 'Add tags to the help article (optional)',
    value: 5,
  },
  {
    label: 'Review and submit the help article',
    value: 6,
  },
];

const AddHelpArticle = () => {
  const token = useSelector(globalSelectors.selectAuthToken);
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'add';
  const articleId = searchParams.get('articleId') || '';
  const navigate = useNavigate();
  const topDiv = useRef<HTMLDivElement>(null);
  const [openTagModal, setOpenTagModal] = useState(false);
  const [stage, setStage] = useState(1);
  const [error, setError] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [content, setContent] = useState('');
  const getHelpArticleQuery = zeapApiSlice.useGetHelpArticleQuery(
    {
      articleId,
    },
    { skip: !token || !articleId },
  );
  const article = getHelpArticleQuery?.data?.data || undefined;
  const isFulfilled = getHelpArticleQuery.status === 'fulfilled';
  const [addHelpArticle, addHelpArticleStatus] =
    zeapApiSlice.useAddHelpArticleMutation();
  const [updateHelpArticle, updateHelpArticleStatus] =
    zeapApiSlice.useUpdateHelpArticleMutation();
  const isLoading =
    addHelpArticleStatus.isLoading ||
    updateHelpArticleStatus.isLoading ||
    getHelpArticleQuery.isLoading;

  useEffect(() => {
    if (mode === 'edit' && isFulfilled && article) {
      setTitle(article.title);
      setCategory(article.category);
      setSubCategory(article.subCategory);
      setContent(article.content);
      setTags(article.tags || []);
    } else if (mode === 'add') {
      setTitle('');
      setCategory('');
      setSubCategory('');
      setContent('');
      setTags([]);
    }
  }, [mode, isFulfilled, article]);

  const scrollToTop = () => {
    if (topDiv.current) {
      topDiv.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const verifyBeforeNextStage = () => {
    if (stage === 1 && !title) {
      setError('Title is required');
      scrollToTop();
      return false;
    }
    if (stage === 2 && !category) {
      setError('Category is required');
      scrollToTop();
      return false;
    }
    if (stage === 3 && !subCategory) {
      setError('Sub-category is required');
      scrollToTop();
      return false;
    }
    if (stage === 4 && !content) {
      scrollToTop();
      setError('Content is required');
      return false;
    }
    setError('');
    return true;
  };

  const handleNextStage = () => {
    if (stage < stages.length) {
      if (verifyBeforeNextStage()) {
        if (tags.length === 0 && stage === 5) {
          return setOpenTagModal(true);
        }

        return setStage(stage + 1);
      }
    }
  };
  const handlePrevStage = () => {
    if (stage > 1) {
      return setStage(stage - 1);
    }
  };
  const handleSubmit = async () => {
    if (verifyBeforeNextStage()) {
      try {
        let payload: {
          articleId?: string;
          title: string;
          category: string;
          subCategory: string;
          content: string;
          tags: string[];
        } = {
          title,
          category,
          subCategory,
          content,
          tags: tags.length > 0 ? tags : [],
        };
        if (mode === 'edit' && article) {
          payload.articleId = article.articleId;
          const newDatata = await updateHelpArticle({
            payload,
          }).unwrap();
          const data = newDatata.data;
          if (data && data.articleId) {
            setRefresh(!refresh);

            navigate(
              `/control-panel/help/article?category=${data.category}&subcategory=${data.subCategory}`,
            );
          }
        } else {
          const newData = await addHelpArticle({
            payload,
          }).unwrap();
          const data = newData.data;

          if (data && data.articleId) {
            setRefresh(!refresh);
            navigate(
              `/control-panel/help/article/${data.articleId}?category=${data.category}&subcategory=${data.subCategory}`,
            );
          }
        }
      } catch (error) {
        scrollToTop();
        setError('Failed to add help article');
      }
    }
  };
  const getCategoryLabel = (value: string) => {
    const categoryOption = helpCenterCategoryOptions.find(
      (option) => option.value === value,
    );
    return categoryOption ? categoryOption.label : 'Unknown Category';
  };
  const getSubCategoryLabel = (value: string) => {
    const subCategoryOption = helpCenterSubCategoryOptions.find(
      (option) => option.value === value,
    );
    return subCategoryOption ? subCategoryOption.label : 'Unknown Sub-category';
  };
  const showForm = () => {
    return mode === 'add' || (mode === 'edit' && isFulfilled && article);
  };
  return (
    <>
      {' '}
      <div
        ref={topDiv}
        className="flex justify-between md:items-center md:justify-between mb-8 p-4 bg-white dark:bg-boxdark  rounded-lg shadow  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <div>
          {' '}
          <h1 className="text-xl md:text-2xltext-dark">Add Help Articles</h1>
        </div>
      </div>
      <div className="max-w-2xl mx-auto p-4 bg-white dark:bg-boxdark rounded-lg shadow">
        {error && (
          <Alert color="failure" className="mb-4">
            <span>{error}</span>
          </Alert>
        )}
        {isLoading && <Loading />}
        {isFulfilled && mode === 'edit' && !article && (
          <Alert color="warning" className="mb-4">
            <span>
              The article you are trying to edit does not exist or has been
              deleted.
            </span>
          </Alert>
        )}
        {showForm() && (
          <div>
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">
                {stages[stage - 1].label}
              </h2>
              {stage === 1 && (
                <TextInput
                  placeholder="Enter the title of the help article"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              )}
              {stage === 2 && (
                <Dropdown
                  label={
                    category ? getCategoryLabel(category) : 'Select a category'
                  }
                  value={category}
                  color={category ? 'success' : 'primary'}
                >
                  {helpCenterCategoryOptions.map((option) => (
                    <Dropdown.Item
                      onClick={() => setCategory(option.value)}
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </Dropdown.Item>
                  ))}
                </Dropdown>
              )}

              {stage === 3 && (
                <Dropdown
                  label={
                    subCategory
                      ? getSubCategoryLabel(subCategory)
                      : 'Select a sub-category'
                  }
                  color={subCategory ? 'success' : 'primary'}
                  value={subCategory}
                >
                  {helpCenterSubCategoryOptions
                    .filter((option) =>
                      option.categories.includes(category as string),
                    )
                    .map((option) => (
                      <Dropdown.Item
                        key={option.value}
                        value={option.value}
                        onClick={() => setSubCategory(option.value)}
                      >
                        {option.label}
                      </Dropdown.Item>
                    ))}
                </Dropdown>
              )}
              {stage === 4 && (
                <Editor
                  placeholder="Write the content of the help article"
                  value={content}
                  onChange={(value) => setContent(value)}
                  refresh={refresh}
                />
              )}
              {stage === 5 && (
                <div className="flex flex-col gap-2">
                  <TextInput
                    placeholder="Add tags (comma separated)"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                  />
                  <div className="flex items-center  gap-2 justify-end w-full">
                    <Button
                      color="success"
                      pill
                      className="w-fit"
                      onClick={() => {
                        if (tagInput.trim()) {
                          setTags([
                            ...tags,
                            ...tagInput.split(',').map((tag) => tag.trim()),
                          ]);
                          setTagInput('');
                        }
                      }}
                    >
                      Add Tags
                    </Button>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex px-3 py-1 bg-gray-200 rounded-full text-sm"
                        >
                          {tag}
                          <IoIosClose
                            className="ml-2 cursor-pointer text-red-500 hover:text-red-700 p-1 rounded-full bg-white"
                            size={24}
                            onClick={() => {
                              setTags(tags.filter((t) => t !== tag));
                            }}
                          />
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {stage === 6 && (
                <div className="p-4 bg-gray-100 rounded-lg">
                  <h3 className="text-lg font-semibold">Review your article</h3>
                  <p>
                    Title: <strong>{title}</strong>
                  </p>
                  <p>
                    Category: <strong>{category}</strong>
                  </p>
                  <p>
                    Sub-category: <strong>{subCategory}</strong>
                  </p>
                  <p>
                    Tags:{' '}
                    <strong>
                      {tags.length > 0 ? tags.join(', ') : 'No tags added'}
                    </strong>
                  </p>
                  <div
                    className="mt-2 prose"
                    dangerouslySetInnerHTML={{ __html: content }}
                  ></div>
                </div>
              )}
            </div>

            <div className="flex justify-between mt-6">
              {stage > 1 && (
                <Button color="gray" onClick={handlePrevStage}>
                  Previous
                </Button>
              )}
              {stage < stages.length ? (
                <Button color="primary" onClick={handleNextStage}>
                  Next
                </Button>
              ) : (
                <Button
                  color="success"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  Submit
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
      {openTagModal && (
        <Modal
          show={openTagModal}
          onClose={() => setOpenTagModal(false)}
          size="md"
          popup={true}
        >
          <Modal.Header>Continue without tags?</Modal.Header>
          <Modal.Body>
            <Alert color="warning" className="mb-4 flex flex-col gap-2">
              <span>
                Are you sure you want to continue without adding tags?
              </span>
              <br />

              <span>
                Tags are optional, but they can help users find your article
                more easily.
              </span>
            </Alert>
          </Modal.Body>
          <Modal.Footer>
            <Button
              color="gray"
              onClick={() => setOpenTagModal(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              color="success"
              onClick={() => {
                setOpenTagModal(false);
                setStage(stage + 1);
              }}
              disabled={isLoading}
            >
              Continue
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default AddHelpArticle;
