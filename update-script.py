import subprocess
import tomllib
from typing import Any


def main() -> None:
    with open("pyproject.toml", "rb") as fp:
        pyproject: dict[str, Any] = tomllib.load(fp)

    dependencies: list[str] = pyproject["project"]["dependencies"]

    for dependency in dependencies:
        package: str = dependency.split(">=")[0]
        uv("remove", package)
        uv("add", package)


def uv(command: str, package: str) -> None:
    subprocess.run(args=["uv", command, package], check=True)


if __name__ == "__main__":
    main()
