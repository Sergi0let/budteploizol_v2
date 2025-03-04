import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type BreadcrumbItemType = {
  label: string;
  href?: string;
  dropdownItems?: { label: string; href: string }[];
};

type BreadcrumbNavigationProps = {
  items: BreadcrumbItemType[];
};

const BreadcrumbNavigation = ({ items }: BreadcrumbNavigationProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <div className="flex items-center" key={index}>
            {item.dropdownItems ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  <BreadcrumbEllipsis className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {item.dropdownItems.map((dropdownItem, idx) => (
                    <DropdownMenuItem key={idx}>
                      <a href={dropdownItem.href}>{dropdownItem.label}</a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : item.href ? (
              <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
            ) : (
              <BreadcrumbPage>{item.label}</BreadcrumbPage>
            )}
            {index < items.length - 1 && (
              <BreadcrumbSeparator className="pl-2" />
            )}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export { BreadcrumbNavigation };
