import {Badge, BadgeProps} from "@radix-ui/themes";
import {Role} from "../model/user";
import {roleLabelMap} from "../model/user-role-label-map";

const roleData: Record<Role, { color: BadgeProps['color'], text: string }> = {
    [Role.ADMIN]: {color: 'plum', text: roleLabelMap[Role.ADMIN]},
    [Role.MODERATOR]: {color: 'grass', text: roleLabelMap[Role.MODERATOR]},
    [Role.AUTHOR]: {color: 'indigo', text: roleLabelMap[Role.AUTHOR]},
}

export type UserRoleBadgeProps = Omit<BadgeProps, 'children'> & {
    userRole: Role;
}

export function UserRoleBadge({userRole, ...props}: UserRoleBadgeProps) {
    const {color, text} = roleData[userRole];
    return (
        <Badge color={color} {...props}>{text}</Badge>
    )
}