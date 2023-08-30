import { IPointerEvent } from '@babylonjs/core';
import { AdvancedDynamicTexture, Image } from '@babylonjs/gui';

export const crossHairImage =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAC0AAAASbCAYAAAAF/j5lAAATRHpUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHjarZlpkuO4EUb/4xQ+AnZkHgdAAhG+gY/vl6Sq3F0zE7bDlroktUSCQC7fAobzj7/f8DcetecYahvStffIo2rVPPkg8X3M5zXF+rw+Dz6uz7e/fR90Pf+NMfNV4b28P0h/39PX958Tvt7T5FP7ZSDZnx/W7z/oO3zM8mOgz4WKzyjzwb5m9Bmo5PeH9BlgvsuKXWX8uoR13vfP+W8Y+Av+0lMcz6z0c/KP/9dB9KxxnZLzKalEXnPJ7wSK/6VQJj9kXnMZHBhL4XMtymsp6TMTAvJncYq/zCr8zMr3px9Z6V+Z/JGU0t8jAl/8Hsz+/f6n36f258EPT4h/uXLZn0/59++3pj8s5+vvXpNw73lXN2snpP2zqK8lPp84kCKs5Tmt8xz8NT6P56k8JVC9m5Rb3FTs4rOmTFpuqsnSTDed532nzRRrPpmU5Jw3ifLvhBRp3iUGclb9mW4e5MqKkL9Negvf5u+5pOe6+lxuJ+HCljgyJwbzrOfgL/+P518OdK+XfEpPwcoTK+aVvQiZhmfOXzmKhKT7VUftCfDX8+fD81rIYHvCLCxwxvUOsVr61JbXUXkSXTiw8f72Whr2GYAQce3GZFIhA/RPacmbKOeREnEU8jMZSHKpeZGC1Fo2ZplrKZ3kSPZrc85Iz7G55fdrMItEtNLLIDU0E7mqABv1M6pQQ7OVVltrvY0mTdvspdfeeu+jO/jNUUYdbfQxhgwdU4pUadJliARRmZq1AI5Nuw4VVZ2Ti05Gnpw9OWDOlVdZdbXV11iydM1N+ey62+57bAlb97RsxcAJ6zZMTG2edCilU087/YwjR8+8lNott952+x1Xrt75nbUU3rT+4fmfZy19ZS0/mfIDx3fWOHWMryGSw0nznJGxXBMZH54BCjp7zqKkWnPw1HnOoma6omVm2Tw5ljxjZLCelNtN37n7V+Z+y1uo9X/KW/7KXPDU/T8yFzx1f5G5P+btT7JmzjY7lvBkyNvQgxoL7ccBZ+551IbY7OvMvLplXaVqrNXKsavQQ6wE7TYGoSM0tLVj9uNtzdaHTNBcVpq6WeGpqci+Dptn3HgbS2RiZ6x1tdnqu5ZzdtWdA/OflMcpNqaVFedpfWaZGRBbGg/x3a2XS8Lj4sqqZZszmNx1ZfeazownjkBwhmkvS063tFcZd99EVnkv/j/GmBMwH97vZGVziVYdK2l32o0Edes3pA4Y5QNmTyoye1meAlJfoiWWi7FO2ZtVANeyR7NZTm93ztvSbUdrWyu2GxYDiq8FYH6WBCL+N+9edaPHGfioch+izw6peVbpSftQpkepmRAegnQgNqKbvHcjwRF64+49COIlDBruapWGsLX4khqfOfP9EjWKYKx76BFqa7exPD3Em0JTiIxD/DgZpPa2Eoxg3H1Ux5rSNikwsHQX6Td3agvKzNLipOkB/j28aD2tS4Dfyj/pTZcZauRyzSGaL+XUJPFnvdXkAmagWbZ4xP3sRXKmlii7LTtUqK7mxU9xQEdMZI2W9ug0gTWqInHBfQ41whkn99bUJU9J5EVi9pRSCrbTBE3a1kO1nB0ucReSXijsaCNuyDaPTvnSlYAXOSGtZ9HDxeg7gkIKGqQ9Zrcal1yjl8kafZxN8r9KYNLdD0pNTy6V17cc+JnOskkhL5mWrC9Co9YysLPAikCX191HXkCerbzr2fECaIDXuK7Uts6xR97q0apkkzKgNvZEWjY6hUNIzwgNbJmAC4XhfDaujZ0XnUptrb0sXvNopjltJC5IbwtxIHjZmw+dMvU+lH1n8nIHoUbiMH2wtHiw6FgfZgwgze7ItJSJsODV6QuQq3r+mNpKhRZZxQ8Gs6bnfBfazfxIGvttbbktjkVE4zlAsldPTtJSKzYBwG23Im0CwDm8IRoV5jDEMmYb1eLYpV9GvkkGkRUW4UsgZrTZ4GTr8FIrpDbPM0KxvpvBGHc3nXLnKjBEXkCdn3dFznbaYaikmlwfCinURIe1ebqi56iyGY7X0YDQAEbGB8egiwwjTSGeYnDGbOiHiwV6egKaRCu2aqlNZjfpOG25BCqicnLzyx96NHGO3jdMK5+rxZG1Cpe4NIEtuh8Ap8llImZzpmSQLZ0ZoXlqrh5a2g9asHYPQD71NKunEBwoVm/f2gk9QAL4bnAVUAbSABm5u69A02k6FDCVRJQ8/2C5lmpzDHAxc/g5sUJMrMaXlhFkifR3atmgDQUtJIe2bdncsRMQlrpas1vOYFrQGaVerWdz0+QBcuFPTqEomHd1dy+pcKViC6glk8n2uribu4EQ6o7eJyZMasPcRKJRzp15CtDH5KAgn+Rljo3JoRJVQ1md2REc6ROtIObSejJ0z5xmlsF3oDcxeKHIzknryb2AOVtIqVBwTC4wzZhvakbVCr5TnDrPycjIAoK2025rcE6udwFqgK7Os9+VIi7QDytnIC1QlaAQbE6Bg4qZMeI9lFGGSiekBQJyNo+qnZakWeolOtAzP3Na5ce4W3hsSgEzoItMrueqF0EGfn8Q+Zcwr8kXG7hlMpfJz7pgogsEjxrscO5CdAjUjqmEUtAHlBkjTjJ6Noxo1zYkSGVl7SgXpTYTlbgr3IIlIlHBsYveqGgfJebTAHr0k12wlALGRyA+YG7ww9Aqd0g9F5rB4oKMDsUbh7TNC5L24cJjOg2Ba/Si7pKGdOobJCcSk1pq825V2QaTzrPgsp2cXyY8DvCGQfnIRkMpsjHBZ4AMIRNDpFw7umi4RW8Yw6ARJgQE1jM1lBK1yfyiQKItbGe0pmOUsob33KAXqbVGlRD204HY7LLNqncEOEOjOf9Sf3fYpPhY3oqh8dGM7kS8Yv/QKptlIjLobwTlPrd3dKOuBP3B0G2jLGEBeAU61Mja4J2uodq5MB0QffBlFj0kmMnllIBCQDq53gSowLBVMvqG9LcNRZ6zlo5WHIkFYNvdzrlVyAs+l4ubdNwSAjIr9D8q+Kwj7YNHRjGwZDh5IZBBJ8h+MQtHznDuIzAr0ed6iPrmHa1FXKgtwJ8sxtIJOEKNeV6yi8FGjwqystHaTAwZGBZmgZPcxAmNVi/xgTMpKOoWRQbGKQm1jopBHg0t7SE1Qljzbt5GcPCVQLou58NjFAOKP8GhEDaCqXYCSo7WXYxwBMnvCoL+JuvoJJQSzibrZACU/55kqte9XYAC5t4IFYVBvW5UNHKjuquQPKH1TMkmL9mjtxT4oxv4QFZ7DaAbfU3/L9J1ygKFHKokusZ5sKK6L3laN360VUy9744MY1gnDc6nsvEvmcJ2ACHClRrC3DJQcxyFdot3QgT1KKsKr6OlJGNwEqB+oaB2cTdHqWyCSnpz26gXMBqF1wsKMtMgeI7yooqmL1ih8cQFyprkldRP2sHT7y6KlRwmqh5h9Qkg0SRSA8wftqBLnZ9WcQ7GpomiZsC2hIKbBV1AifbA/NPZRO5gocgBPII1ILcAJtYAAM+ZKgZScTwOEAgTMA4bdLl6BxQjqgSmBc/hN1cOfaGn0T4Z7JwOOgdJDNTT3veSTj0ZCX1Hrx5gS+QODUn+Tkx7h+X0DDMigHPz4qMuSQW9/5iIhkdyBUNJ4f0QGkDFq/ypBfwlrT/MN34CmqcdcHg7xnZE5MLM0tblkSfZUZZOQVaS1DX8H0IRUzgPHVDGUJ+SyggDBDpe9feeOyBaqgw+Z335DxYFkmOR2CCORUyMp4aoDGAdqKWF8cqTYxAOA+nuSapu4wBRrolOJs3H955ip4eGXpSea5dyB3YLEiTrO7gUQM8s0BzApTOhCySTObpQM4XkP2IW5CPMbtmxWgerz+nboHU4WbFgYQ1D8OA7wXXKL5UKEZkWGNhB4jEIlDkwS3DcslI7FYzIThhNsdXkgAIMKN4aETud+PQChAHL2CH0EJIAwD9YfO2RWCN5cncJi9I8gDxo6olwLEQNBnB0uAUArnIBxnSi2Oiabb7Fd920dxCmgwkooV09+FEd+SJVXab16BA1EaMIRCpPp6uJvqCONN3fTOR1MRvkEtjeYBia4JhrVSDU6AVmIy6Q6fkB97uoPB205fKwM1JZGgqPdOAA8ZmUDb0O2j7djBSjTci5LhzuZhmGjiE0AQxwhQZDGyjjnf4gq8LcC4eNtYawYQCIlIJ7NTPOHvKCQ25iBt2FuYSC7r3em3VPus58nwOS541BEOzjaRVQgGoyZjPB0QHaCFcBs51qp293h1nNjRdTeVX0PgOd+yVlPu+0fImw6iG+SueCpligXlfDonbc3uoBBQZnDfoS6AXw7pTUF22IQgQ6C1VxY6LPO5WvB6EASzHB5aia+NQhJrIZ0h2+gQyY0LxA29Csm5EPVIbdgScGUuISJAjva68DgRTXNRfzidEi8paChEG7Yti4BJY1wskM7or3IP7SEy2ihN2LbuYmkLSfzF+IK9FSDZbP+LV6vNsdDK5QQOXA73j15Kre68ZRT/mVeGB0E6SJ52V4Go4wpZMBKyAtMHMw0e8g7MSx2fCR2HU36tQPAw3cXzuupTQSFsRtQc2UjuREZRCFA9MlDcQFoUOLbhf5GDdctPc7RQIEoBRBYRfxtVKC07fs0HB3vOGalSs336wfoboXo+oWAgI4Y4GousoqfEO2gdKIT7w2Pa9YxoqDnmq4f0iR7uUgLKjvFwdRCI7QYtvN/X2ZCSBCQLFQlDQ/XRwcnYDxgSCBOmsE8mbHI5AQDDBqeYZPQt+JCq2MdLjd92nQKoPypwH8Xg0KdaLLczIoFF2DAG/RIw0FMnMJzUWfU+HADcVC3BpIb8T90HbEJIu7QfoBNY24cOlS0BLVLcnxfcrsFi+GEiPTi4hGwr1wSclNQLdH4Sj9KtjLMWggt9vArOvUtw6o0Y0ZwbOivgPDQofI+I6o9Z1gTMy7MebocmgIpqAV35h8+2zBaiyTCxuMVreLd0qzbnQ2jANk+vwfM8VcCjBnwlyBiQGTXRSDr3k8e6+9eMNxILYjV0rf72q04GWC7wGH0aQgcXJyQS4v17YD4Q4nPLsR8CHFkbubCWgXPiWOSEK4AX0ygnpbVofM5fvBhEPQeoYHSCiOBVNh9zqyxq/SaS1AD3LB1Gzng+l8gLw9wRYkzU8PfGmDdZEZrheWoJELJtn34tBylBLejYo3qA4tkeAC3VdBHhZ/WJq2jt+8u/oOBoKV4GLXUH7MKTsW+JbsxmR74+7lWnqNxCXgaBquIpNxC4HXqi7MrFV3Ww1IRcYCIhix82h3NLKNjmjF2iGLQThdBkZggtCl7n65ApRNatF5C2V73G82v6lI229ULsoJndMW6sBgYWBjkyv3dnQXPYYyLyzLdPdAORLKB6yPG5nlN7Q2g1WgxcC/63e1Kh+4RsWfXBdlJaODGh2EbxR6DumHqFKgjaXQtiha+BHp5vMBcQgqv2YHXhAbUD6jTt84900KpuYOmidltfwuhPhuEz2iv1hhSgSVRlPZuKC9PKp2IcPGhZFx+9e5F51JP8iuycWo0p200EZoAHaRijvickEU9PAdD5eI1mHmdRUcuBueaFs5hWoXe/Vz+Lbl8LKgJR6VieczLgQDD+fcNRErCReYWDGdC4+DC+NgMrAbEeV4LABWqyQarTdZKBOLE5ZDMFLKSC8M/qAgsemjNgQ07QKMItl3kpPxRwVsBaFKuGg+Zu0KBph0g4vewai3sxzjyVNclBxS0y0TlhbFhVOA6B+zoVgl4AMY4WdsRlqzo7un3z1hstFL/7ldXQH8iGyccbp46QMttrCUFQan7cnTYBaAOQMh0rbfRpEP5WdnZYzJTn7DpaNHKDvJiFFQwqWS77gQG8yCPhujTD8lRMQAgH2b/blh3/GOMD/ytbl7AvPrsyEJb2TfcUzu5ekdl5iZ+I5HywEOQXxvTp1EaAsOrJj77euuLtp26lmEShwsl7V4FmmttrFzfssHvEYFAtIzoLaRQPhDyhGrIn47yuAk6GNkcKf5TRWOF+b3oUVM1U/dg836+cWnsPFuF/MIVhmGnkSk7fetU4ZUOr4CXEA8Ht2wPByvO0xUa3b50ZFztMX0UsEXYiWG2xOWmE5Bq2P9IUqijmdDmEPgPS0vcXxDNAvDBVCmVKNj5F5dxO8TgRZQSUu+WYwCU+D94syy34aj2cEmnD3YafGzGxyq2xyCvf1OEWyJxYAKUev2tUv8scUdSijYfrANnSrPzXOMdXG2A7vxa0SPVjbfc0HhNwFfYF+EGNNGN8P1vvGLWsAqoHjUt82wQzzob6sYCgHew+bTZeL1vaW1L5yGaoXhnA2hDVckzbBv+BfsGtOBH0BsWJbmSb4lnXOX8EiIub7lK/LIMNVzcwLAdppRqsX9VrwbVntFwlJHYhCK/oXf8b0BzEe5gDH9aTGwCaGuHqDiO6LaXNyQvuNeyEkDH4LtXz+2BP+qjv7te8v1vUewkmPKPME3xL9vEjw9iGIDIgeuWrvH5jJ/nG0brBQfrLgusI9AIm18S2jjtmGR3GRTCGAs8sjvKHhiCblfuaT0NIg72+z7yZgOnUQMt6AF04E+qSviBMgabZZlM9f3fl0kXijxGMM/ARu9keugXDHBAAABhWlDQ1BJQ0MgcHJvZmlsZQAAeJx9kT1Iw0AcxV9TpSIVQTtIcchQnSyIigguUsUiWChthVYdTC79giYNSYqLo+BacPBjserg4qyrg6sgCH6AuLk5KbpIif9LCi1iPDjux7t7j7t3gNCoMNXsGgdUzTJS8ZiYza2KgVcEEUYIsxiQmKkn0osZeI6ve/j4ehflWd7n/hx9St5kgE8knmO6YRFvEE9vWjrnfeIQK0kK8TnxmEEXJH7kuuzyG+eiwwLPDBmZ1DxxiFgsdrDcwaxkqMRTxBFF1ShfyLqscN7irFZqrHVP/sJgXltJc53mMOJYQgJJiJBRQxkVWIjSqpFiIkX7MQ9/2PEnySWTqwxGjgVUoUJy/OB/8LtbszA54SYFY0D3i21/jACBXaBZt+3vY9tungD+Z+BKa/urDWDmk/R6W4scAf3bwMV1W5P3gMsdYOhJlwzJkfw0hUIBeD+jb8oBg7dA75rbW2sfpw9AhrpavgEODoHRImWve7y7p7O3f8+0+vsB3mRy0u+HtlQAAA+caVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA0LjQuMC1FeGl2MiI+CiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICB4bWxuczppcHRjRXh0PSJodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wRXh0LzIwMDgtMDItMjkvIgogICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgeG1sbnM6cGx1cz0iaHR0cDovL25zLnVzZXBsdXMub3JnL2xkZi94bXAvMS4wLyIKICAgIHhtbG5zOkdJTVA9Imh0dHA6Ly93d3cuZ2ltcC5vcmcveG1wLyIKICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICB4bXBNTTpEb2N1bWVudElEPSJnaW1wOmRvY2lkOmdpbXA6MzA1YjQ0N2QtNDkxZC00OTFjLWFlOWMtMTEyYjkzYTVkYjkyIgogICB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM3Yzg3Zjk4LWIxMzctNGViYy1iOTZiLTZlMWUzNmNmNGY0ZiIKICAgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmNmNmQ3YWNjLWRiY2EtNDQwYy1iOGMxLWIxNjhjMjUzMjRkZSIKICAgR0lNUDpBUEk9IjIuMCIKICAgR0lNUDpQbGF0Zm9ybT0iV2luZG93cyIKICAgR0lNUDpUaW1lU3RhbXA9IjE2NDA1OTQ5NzM5ODg0NDAiCiAgIEdJTVA6VmVyc2lvbj0iMi4xMC4yMiIKICAgZGM6Rm9ybWF0PSJpbWFnZS9wbmciCiAgIHRpZmY6T3JpZW50YXRpb249IjEiCiAgIHhtcDpDcmVhdG9yVG9vbD0iR0lNUCAyLjEwIj4KICAgPGlwdGNFeHQ6TG9jYXRpb25DcmVhdGVkPgogICAgPHJkZjpCYWcvPgogICA8L2lwdGNFeHQ6TG9jYXRpb25DcmVhdGVkPgogICA8aXB0Y0V4dDpMb2NhdGlvblNob3duPgogICAgPHJkZjpCYWcvPgogICA8L2lwdGNFeHQ6TG9jYXRpb25TaG93bj4KICAgPGlwdGNFeHQ6QXJ0d29ya09yT2JqZWN0PgogICAgPHJkZjpCYWcvPgogICA8L2lwdGNFeHQ6QXJ0d29ya09yT2JqZWN0PgogICA8aXB0Y0V4dDpSZWdpc3RyeUlkPgogICAgPHJkZjpCYWcvPgogICA8L2lwdGNFeHQ6UmVnaXN0cnlJZD4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii8iCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MjljMjRiN2YtZmVhMC00MTdkLWJhMjgtZWI2ZjI2MzhmZDYyIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJHaW1wIDIuMTAgKFdpbmRvd3MpIgogICAgICBzdEV2dDp3aGVuPSIyMDIxLTEyLTI3VDAzOjQ5OjMzIi8+CiAgICA8L3JkZjpTZXE+CiAgIDwveG1wTU06SGlzdG9yeT4KICAgPHBsdXM6SW1hZ2VTdXBwbGllcj4KICAgIDxyZGY6U2VxLz4KICAgPC9wbHVzOkltYWdlU3VwcGxpZXI+CiAgIDxwbHVzOkltYWdlQ3JlYXRvcj4KICAgIDxyZGY6U2VxLz4KICAgPC9wbHVzOkltYWdlQ3JlYXRvcj4KICAgPHBsdXM6Q29weXJpZ2h0T3duZXI+CiAgICA8cmRmOlNlcS8+CiAgIDwvcGx1czpDb3B5cmlnaHRPd25lcj4KICAgPHBsdXM6TGljZW5zb3I+CiAgICA8cmRmOlNlcS8+CiAgIDwvcGx1czpMaWNlbnNvcj4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PnJHjTIAAAAGYktHRAAAAAAAAPlDu38AAAAJcEhZcwAAHYQAAB2EASJc0AgAAAAHdElNRQflDBsIMSFMkltaAAAgAElEQVR42uzBAQEAAACAkP6v7ggKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACA2bv/YLvr+s7jr8+5PxJIMAQQHa1WFLe/p6Y/pSKg29JWpFpHt26cbd12RvtLGTDU4qqTtg5jl4Roa63Saqe71a3STuuPFsZe8sOl2lrTLYK2mgXtVkRTNQoEAuSe9/6RIDm55+aec3OInHMfj5nvAN8f516e9z354857vgEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqtAcHJAAAAACC/r9uR6ACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVxlf2AAAAjdJREFUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwEn71P7I6yC4QAAAABJRU5ErkJggg==';

const showCrossHair = (event: IPointerEvent) => {
  const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI('UI');
  const crosshair = new Image('crossHair', crossHairImage);
  crosshair.width = event.target.width / 1000;
  crosshair.height = event.target.height / 1000;
  crosshair.alpha = 0.5;
  advancedTexture.addControl(crosshair);
};

export const showUI = (event: IPointerEvent) => {
  showCrossHair(event);
};
