"use client";

import Link from "next/link";
import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { categoryListData } from "@/data/category";
import { cn } from "@/lib/utils";
import {
  Category,
  CategoryDisplayNames,
  SubCategoryRolls,
  SubCategoryRollsDisplayNames,
  SubCategorySoundproofing,
  SubCategorySoundproofingDisplayNames,
} from "@/types";

function Navigation() {
  return (
    <NavigationMenu className="hidden lg:block">
      <NavigationMenuList>
        {categoryListData.map((category) => {
          if (category.subCategory && category.subCategory.length > 0) {
            return (
              <NavigationMenuItem key={category.id}>
                <NavigationMenuTrigger>{category.name}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul
                    key={`${category.name}-sub-categories`}
                    className="grid w-[400px] gap-3 p-4 text-zinc-800 md:w-[500px] md:grid-cols-2 lg:w-[600px]"
                  >
                    <ListItem
                      key={category.name}
                      href={`/catalog/${category.url}`}
                    >
                      Усі {category.name}
                    </ListItem>
                    {category.subCategory.map(
                      ([subCategoryName, subCategoryLink]) => (
                        <ListItem
                          key={subCategoryName}
                          href={
                            category.name ===
                            CategoryDisplayNames[Category.Rolls]
                              ? `/catalog/${Category.Rolls}/${subCategoryLink}`
                              : category.name ===
                                  CategoryDisplayNames[Category.Soundproofing]
                                ? `/catalog/${Category.Soundproofing}/${subCategoryLink}`
                                : "#"
                          }
                        >
                          {category.name ===
                          CategoryDisplayNames[Category.Rolls]
                            ? SubCategoryRollsDisplayNames[
                                subCategoryLink as SubCategoryRolls
                              ]
                            : category.name ===
                                CategoryDisplayNames[Category.Soundproofing]
                              ? SubCategorySoundproofingDisplayNames[
                                  subCategoryLink as SubCategorySoundproofing
                                ]
                              : ""}
                        </ListItem>
                      ),
                    )}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          } else {
            return (
              <NavigationMenuItem key={category.id}>
                <Link href={`/catalog/${category.url}`} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {category.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            );
          }
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sky-50 hover:text-blue-600",
            className,
          )}
          {...props}
        >
          <div className="text-lg font-medium leading-none">{title}</div>
          <p className="text-zink-600 line-clamp-2 text-base leading-snug">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export { Navigation };
