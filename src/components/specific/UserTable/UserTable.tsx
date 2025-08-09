import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type {
  User,
  UserStatus,
  UserTableFilters,
  SortConfig,
} from "../../../types";
import Button from "../../common/Button";
import "./UserTable.scss";
import Filter from "/assets/icons/filter.png";

interface UserTableProps {
  users: User[];
  loading?: boolean;
  onStatusChange: (userId: string, status: UserStatus) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  loading = false,
  onStatusChange,
}) => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<UserTableFilters>({});
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [showFilters, setShowFilters] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const columns = [
    { key: "orgName", label: "ORGANIZATION", sortable: true, filterable: true },
    { key: "userName", label: "USERNAME", sortable: true, filterable: true },
    { key: "email", label: "EMAIL", sortable: true, filterable: true },
    {
      key: "phoneNumber",
      label: "PHONE NUMBER",
      sortable: true,
      filterable: true,
    },
    {
      key: "dateJoined",
      label: "DATE JOINED",
      sortable: true,
      filterable: true,
    },
    { key: "status", label: "STATUS", sortable: true, filterable: true },
  ];

  const filteredAndSortedUsers = useMemo(() => {
    let result = [...users];

    // Apply filters
    if (filters.organization) {
      result = result.filter((user) =>
        user.orgName.toLowerCase().includes(filters.organization!.toLowerCase())
      );
    }
    if (filters.username) {
      result = result.filter((user) =>
        user.userName.toLowerCase().includes(filters.username!.toLowerCase())
      );
    }
    if (filters.email) {
      result = result.filter((user) =>
        user.email.toLowerCase().includes(filters.email!.toLowerCase())
      );
    }
    if (filters.phoneNumber) {
      result = result.filter((user) =>
        user.phoneNumber.includes(filters.phoneNumber!)
      );
    }
    if (filters.status) {
      result = result.filter((user) => user.status === filters.status);
    }

    // Apply sorting
    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof User] as string;
        const bValue = b[sortConfig.key as keyof User] as string;

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [users, filters, sortConfig]);

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleFilterChange = (key: string, value: string) => {
    if (key === "status" && value === "") {
      setFilters((prev) => {
        const newFilters = { ...prev };
        delete newFilters.status;
        return newFilters;
      });
    } else {
      setFilters((prev) => ({ ...prev, [key]: value }));
    }
  };

  const toggleFilter = (columnKey: string) => {
    setShowFilters(showFilters === columnKey ? null : columnKey);
  };

  const toggleMenu = (userId: string) => {
    setActiveMenu(activeMenu === userId ? null : userId);
  };

  const handleViewDetails = (userId: string) => {
    navigate(`/users/${userId}`);
    setActiveMenu(null);
  };

  const handleStatusChange = (userId: string, newStatus: UserStatus) => {
    onStatusChange(userId, newStatus);
    setActiveMenu(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getStatusClassName = (status: UserStatus) => {
    switch (status) {
      case "Active":
        return "user-table__status--active";
      case "Pending":
        return "user-table__status--pending";
      case "Blacklisted":
        return "user-table__status--blacklisted";
      case "Inactive":
        return "user-table__status--inactive";
      default:
        return "";
    }
  };

  const resetFilters = () => {
    setFilters({});
    setShowFilters(null);
  };

  const applyFilters = () => {
    setShowFilters(null);
  };

  if (loading) {
    return (
      <div className="user-table">
        <div className="user-table__loading">
          <div className="user-table__loading-spinner"></div>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-table">
      <div className="user-table__container">
        <div className="user-table__header">
          <table className="user-table__table">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.key} className="user-table__th">
                    <div className="user-table__th-content">
                      <span
                        className={`user-table__th-text ${
                          column.sortable ? "user-table__th-text--sortable" : ""
                        }`}
                        onClick={
                          column.sortable
                            ? () => handleSort(column.key)
                            : undefined
                        }
                      >
                        {column.label}
                        {sortConfig?.key === column.key && (
                          <span className="user-table__sort-indicator">
                            {sortConfig.direction === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </span>

                      {column.filterable && (
                        <button
                          className="user-table__filter-btn"
                          onClick={() => toggleFilter(column.key)}
                        >
                          <img src={Filter} alt="filter btn" />
                        </button>
                      )}
                    </div>

                    {showFilters === column.key && (
                      <div className="user-table__filter-dropdown">
                        <div className="user-table__filter-content">
                          {column.key === "status" ? (
                            <select
                              value={filters.status || ""}
                              onChange={(e) =>
                                handleFilterChange("status", e.target.value)
                              }
                              className="user-table__filter-select"
                            >
                              <option value="">All Statuses</option>
                              <option value="Active">Active</option>
                              <option value="Inactive">Inactive</option>
                              <option value="Pending">Pending</option>
                              <option value="Blacklisted">Blacklisted</option>
                            </select>
                          ) : (
                            <input
                              type={
                                column.key === "dateJoined" ? "date" : "text"
                              }
                              placeholder={`Filter by ${column.label.toLowerCase()}`}
                              value={
                                filters[column.key as keyof UserTableFilters] ||
                                ""
                              }
                              onChange={(e) =>
                                handleFilterChange(column.key, e.target.value)
                              }
                              className="user-table__filter-input"
                            />
                          )}

                          <div className="user-table__filter-actions">
                            <Button
                              variant="outline"
                              size="small"
                              onClick={resetFilters}
                            >
                              Reset
                            </Button>
                            <Button
                              variant="primary"
                              size="small"
                              onClick={applyFilters}
                            >
                              Filter
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </th>
                ))}
                <th className="user-table__th user-table__th--actions"></th>
              </tr>
            </thead>
          </table>
        </div>

        <div className="user-table__body">
          <table className="user-table__table">
            <tbody>
              {filteredAndSortedUsers.map((user) => (
                <tr
                  key={user.id}
                  className="user-table__row user-table__row--clickable"
                  onClick={() => handleViewDetails(user.id)}
                >
                  <td className="user-table__td">{user.orgName}</td>
                  <td className="user-table__td">{user.userName}</td>
                  <td className="user-table__td">{user.email}</td>
                  <td className="user-table__td">{user.phoneNumber}</td>
                  <td className="user-table__td">
                    {formatDate(user.dateJoined)}
                  </td>
                  <td className="user-table__td">
                    <span
                      className={`user-table__status ${getStatusClassName(
                        user.status
                      )}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="user-table__td user-table__td--actions">
                    <div className="user-table__actions">
                      <button
                        className="user-table__menu-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMenu(user.id);
                        }}
                      >
                        ⋮
                      </button>

                      {activeMenu === user.id && (
                        <div className="user-table__menu">
                          <button
                            className="user-table__menu-item"
                            onClick={() => handleViewDetails(user.id)}
                          >
                            <span className="user-table__menu-icon">👁️</span>
                            View Details
                          </button>
                          <button
                            className="user-table__menu-item"
                            onClick={() =>
                              handleStatusChange(user.id, "Blacklisted")
                            }
                          >
                            <span className="user-table__menu-icon">❌</span>
                            Blacklist User
                          </button>
                          <button
                            className="user-table__menu-item"
                            onClick={() =>
                              handleStatusChange(user.id, "Active")
                            }
                          >
                            <span className="user-table__menu-icon">✅</span>
                            Activate User
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredAndSortedUsers.length === 0 && (
            <div className="user-table__empty">
              <p>No users found matching your criteria.</p>
              <Button variant="outline" onClick={resetFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserTable;
