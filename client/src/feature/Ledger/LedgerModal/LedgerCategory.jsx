import React, { useState, useEffect, useRef } from "react";
import {
  readAllCategories,
  addCategories,
  editCategories,
  deleteCategories,
} from "../../../api/categories.api";
import styled from "styled-components";
import { MdEdit, MdDelete, MdClose } from "react-icons/md";

const LedgerCategory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [editingCategoryId, setEditingCategoryId] = useState(null); // 수정 중인 카테고리의 ID를 추적하는 상태
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isCategorySelect, setIsCategorySelect] = useState(false);
  const listRef = useRef();

  useEffect(() => {
    // 모든 카테고리 데이터 가져오기
    const fetchAllCategories = async () => {
      try {
        const categories = await readAllCategories();
        setAllCategories(categories);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllCategories();
  }, []);

  // 카테고리 추가 함수
  const handleAddCategory = async () => {
    try {
      const newCategory = await addCategories(1, searchQuery); // memberId에 해당하는 값 사용
      setAllCategories([...allCategories, newCategory]);
      setSearchQuery(""); // 추가 후 검색어 초기화
    } catch (error) {
      console.error(error);
    }
  };

  // 카테고리 수정 함수
  const handleEditCategory = async (categoryId, updatedCategoryName) => {
    try {
      await editCategories(1, categoryId, updatedCategoryName);
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

  // 카테고리 삭제 함수
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

  // 검색 결과 카테고리 필터링
  const filteredCategories = allCategories.filter((category) =>
    category.category_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 검색어 입력 이벤트 처리
  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // 검색어 입력 후 엔터 키 처리
  const handleSearchQueryEnter = (e) => {
    if (e.key === "Enter") {
      handleAddCategory();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery(""); // 검색어를 비움
    setIsCategorySelect(false); // isCategorySelect를 false로 변경
  };

  const handleOutsideClick = (event) => {
    if (listRef.current && !listRef.current.contains(event.target)) {
      setIsCategoryOpen(false);
    }
  };

  return (
    <CategoryContainer>
      {/* 카테고리 검색 창 */}
      {isCategorySelect && (
        <>
          <button
            type="text"
            value={searchQuery}
          >
            {searchQuery}
            <CloseIcon onClick={() => handleClearSearch()} />
          </button>
          <p>true일때</p>
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
          <p>false일때</p>
        </>
      )}

      {/* 검색 결과 카테고리 목록 */}

      {isCategoryOpen && (
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
      )}
      {/* 새로운 카테고리 추가 */}
      {/* 엔터 키 처리는 위에서 handleSearchQueryEnter 함수를 사용 */}
    </CategoryContainer>
  );
};

export default LedgerCategory;

const CloseIcon = styled(MdClose)`
  cursor: pointer;
  margin-left: 8px;
  font-size: 1.2rem;
  color: #888;
`;

const CategoryContainer = styled.div`
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  width: 30rem;
  margin: 10rem;
`;

const CategoryList = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 100%;
`;

const CategoryItem = styled.button`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  flex: 1;
  width: 100%;
`;

const CategoryEditSpan = styled.span`
  flex: 1;
  width: 100%;
`;

const CategoryEditInput = styled.input`
  flex: 1;
  width: 100%;
`;

const SearchInput = styled.input`
    width: 100%;
`

const CategoryEditButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
`;

const CategoryDeleteButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
`;
