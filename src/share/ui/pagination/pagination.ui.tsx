'use client'

import {Flex, IconButton, Text} from '@radix-ui/themes';
import {ChevronLeftIcon, ChevronRightIcon} from "@radix-ui/react-icons";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
}

export function Pagination({currentPage, totalPages: tp}: PaginationProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();
    const totalPages = Math.max(tp, 1);

    const changePage = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        replace(`${pathname}?${params.toString()}`);
    }

    const handlePrevious = () => {
        if (currentPage > 1) {
            changePage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            changePage(currentPage + 1);
        }
    };

    return (
        <Flex gap="3" align="center">
            <IconButton
                onClick={handlePrevious}
                disabled={currentPage === 1}
            >
                <ChevronLeftIcon/>
            </IconButton>
            <Text>
                Страница {currentPage} из {totalPages}
            </Text>
            <IconButton
                onClick={handleNext}
                disabled={currentPage === totalPages}
            >
                <ChevronRightIcon/>
            </IconButton>
        </Flex>
    );
}