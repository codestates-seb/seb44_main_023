import React, { useState, useEffect, useRef } from "react";
import {
  readAllCategories,
  addCategories,
  editCategories,
  deleteCategories,
} from "../../../../api/categories.api";
import styled from "styled-components";
import { MdEdit, MdDelete, MdClose } from "react-icons/md";

const LedgerCategory = ({ onCategorySelect }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isCategorySelect, setIsCategorySelect] = useState(false);
  const listRef = useRef();

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const response = await readAllCategories();
        setAllCategories(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllCategories();
  }, []);

  const handleAddCategory = async () => {
    try {
      const newCategory = await addCategories(searchQuery);
      setAllCategories([...allCategories, newCategory]);
      setSearchQuery("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditCategory = async (categoryId, updatedCategoryName) => {
    try {
      await editCategories(categoryId, updatedCategoryName);
      setAllCategories(
        allCategories.map((category) =>
          category.category_id === categoryId
            ? {
                ...category,
                category_name: updatedCategoryName,
                editing: false,
              }
            : category
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategories(categoryId);
      setAllCategories(
        allCategories.filter((category) => category.category_id !== categoryId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const filteredCategories = allCategories.filter((category) =>
    category.category_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchQueryEnter = (e) => {
    if (e.key === "Enter") {
      handleAddCategory();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setIsCategorySelect(false);
    onCategorySelect(undefined);
  };

  return (
    <CategoryContainer>
      {isCategorySelect && (
        <>
          <SelectBtn type="text" value={searchQuery}>
            <SelectBtnText>{searchQuery}</SelectBtnText>
            <CloseIcon onClick={() => handleClearSearch()} />
          </SelectBtn>
        </>
      )}
      {!isCategorySelect && (
        <>
          <SearchInput
            type="text"
            value={searchQuery}
            onChange={handleSearchQueryChange}
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            onKeyPress={handleSearchQueryEnter}
            placeholder="카테고리를 입력하세요"
          />
        </>
      )}
      {isCategoryOpen && (
        <CategoryListContainer>
          <CategoryList ref={listRef}>
            {filteredCategories.map((category) => (
              <CategoryItem key={category.category_id}>
                {editingCategoryId === category.category_id ? (
                  <CategoryEditInput
                    value={category.category_name}
                    onChange={(e) =>
                      setAllCategories(
                        allCategories.map((c) =>
                          c.category_id === category.category_id
                            ? { ...c, category_name: e.target.value }
                            : c
                        )
                      )
                    }
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleEditCategory(
                          category.category_id,
                          category.category_name
                        );
                        setEditingCategoryId(null);
                      }
                    }}
                    onBlur={() => {
                      handleEditCategory(
                        category.category_id,
                        category.category_name
                      );
                      setEditingCategoryId(null);
                    }}
                  />
                ) : (
                  <>
                    <CategoryEditSpan
                      onClick={() => {
                        setSearchQuery(category.category_name);
                        setIsCategoryOpen(false);
                        setIsCategorySelect(true);
                        onCategorySelect(category.category_id);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {category.category_name}
                    </CategoryEditSpan>
                    <CategoryEditButton
                      onClick={() => setEditingCategoryId(category.category_id)}
                    >
                      <MdEdit />
                    </CategoryEditButton>
                    <CategoryDeleteButton
                      onClick={() => handleDeleteCategory(category.category_id)}
                    >
                      <MdDelete />
                    </CategoryDeleteButton>
                  </>
                )}
              </CategoryItem>
            ))}
          </CategoryList>
        </CategoryListContainer>
      )}
    </CategoryContainer>
  );
};

export default LedgerCategory;

const SearchInput = styled.input`
  width: 20rem;
  background-color: transparent;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const CategoryContainer = styled.div`
  background-color: transparent;
  position: relative;
  display: inline-block;
`;

const CategoryListContainer = styled.div`
  border-radius: 1rem;
`;

const CategoryList = styled.ul`
  list-style-type: none;
  padding: 0;
  border-radius: 1rem;
  width: 13rem;
  position: absolute;
  top: calc(100%);
  width: 100%;
  background-color: var(--color-gray-02);
  border-radius: 0.5rem;
  border: 0.1rem solid var(--color-gray-10);
  max-height: 16rem;
  overflow-y: auto;
`;

const CategoryItem = styled.div`
  display: flex;
  flex: 1;
  font-size: 1.5rem;
  border-bottom: 1px solid var(--color-gray-10);
  span {
    text-align: left;
    margin-top: 0.5rem;
    margin-left: 0.9rem;
    margin-bottom: 0.5rem;
    color: var(--color-gray-9);
  }
  &:hover {
    background-color: var(--color-blue-01);
  }
`;

const CategoryEditSpan = styled.span`
  flex: 1;
  width: 100%;
`;

const CategoryEditInput = styled.input`
  flex: 1;
  width: 100%;
  background-color: var(--color-blue-01);
  border-radius: 0.5rem;
  text-align: left;
  margin: 0rem 1.2rem;
`;

const CategoryEditButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0.5rem 0rem 0rem 0rem;
  cursor: pointer;
  font-size: 1rem;
`;

const CategoryDeleteButton = styled.button`
  background-color: transparent;
  border: none;
  margin: 0.5rem 0.5rem 0rem 0.3rem;
  cursor: pointer;
  font-size: 1rem;
`;

const SelectBtn = styled.button`
  border-radius: 2rem;
  background-color: var(--color-blue-01);
  justify-content: center;
  align-items: center;
`;

const CloseIcon = styled(MdClose)`
  cursor: pointer;
  margin-left: 0.6rem;
  margin-right: 0.5rem;
  font-size: 1.4rem;
  color: var(--color-gray-10);
`;

const SelectBtnText = styled.span`
  margin-left: 1rem;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  color: var(--color-gray-9);
`;
