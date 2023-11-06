import { useState, useEffect } from 'react';

const usePagination = (data, itemsPerPage) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = data ? Math.ceil(data.length / itemsPerPage) : 0;

    useEffect(() => {
        setCurrentPage(1);
    }, [data]);

    const nextPage = () => {
        setCurrentPage((currentPage) => Math.min(currentPage + 1, totalPages));
    };

    const prevPage = () => {
        setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
    };

    const goToPage = (page) => {
        const pageNumber = Math.max(1, Math.min(page, totalPages));
        setCurrentPage(pageNumber);
    };

    const paginatedData = data ? data.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    ) : [];

    return {
        currentPage,
        totalPages,
        nextPage,
        prevPage,
        goToPage,
        paginatedData,
    };
};

export default usePagination;

