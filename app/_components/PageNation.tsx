"use client";

import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import React from "react";

interface Props {
    itemCount: number;
    pageSize: number;
    currentPage: number;
}

export default function PageNation({ itemCount, pageSize, currentPage }: Props) {
    const pageCount = Math.ceil(itemCount / pageSize);
    if (pageCount <= 1) return null;

    return (
        <Flex>
            <Text>
                Page {currentPage} of {pageCount}
            </Text>
            <Button color='gray' variant='soft' disabled={currentPage === 1} onClick={() => {}}>
                <DoubleArrowLeftIcon />
            </Button>
            <Button color='gray' variant='soft' disabled={currentPage === 1} onClick={() => {}}>
                <ChevronLeftIcon />
            </Button>
            <Button
                color='gray'
                variant='soft'
                disabled={currentPage === pageCount}
                onClick={() => {}}>
                <ChevronRightIcon />
            </Button>
            <Button
                color='gray'
                variant='soft'
                disabled={currentPage === pageCount}
                onClick={() => {}}>
                <DoubleArrowRightIcon />
            </Button>
        </Flex>
    );
}
