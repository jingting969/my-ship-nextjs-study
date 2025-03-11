'use client';

import { useRouter } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    router.push(`/blog?page=${page}`);
  };

  // 计算要显示的页码范围
  const getPageNumbers = () => {
    const delta = 2; // 当前页前后显示的页数
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  return (
    <div className="flex justify-center items-center space-x-1">
      {/* 上一页按钮 */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        上一页
      </button>
      
      {/* 页码 */}
      {getPageNumbers().map((page, index) => (
        typeof page === 'number' ? (
          <button
            key={index}
            onClick={() => handlePageChange(page)}
            className={`w-10 h-10 rounded-md flex items-center justify-center transition-colors ${
              currentPage === page 
                ? 'bg-blue-600 text-white font-medium' 
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="w-10 h-10 flex items-center justify-center text-gray-500">
            {page}
          </span>
        )
      ))}
      
      {/* 下一页按钮 */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        下一页
      </button>
    </div>
  );
} 